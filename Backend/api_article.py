from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
import requests
from llmware.models import ModelCatalog
from urllib.parse import urlparse
from models.summarization import GeminiSummarizationModel
from pydantic import BaseModel
import asyncio
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# ✅ Must come right after app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use "*" for testing, restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Generalized scraping function
def scrape_article(url):
    print(url)
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    print(parsed_url)
    if 'dev.to' in domain:
        return scrape_dev_article(url)
    elif 'medium.com' in domain or 'levelup.gitconnected.com' in domain:
        return scrape_medium_article(url)
    else:
        return None, 'Unsupported website', '', ''

def scrape_dev_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_tag = soup.find('h1')
        title = title_tag.get_text() if title_tag else 'No title found'

        content_div = soup.find('div', class_='crayons-article__main')
        paragraphs = content_div.find_all('p') if content_div else []
        content = ''
        for paragraph in paragraphs:
            content += paragraph.get_text() + '\n\n'

        comments_divs = soup.find_all('div', class_='comment__body')
        comments = ''
        for comment_div in comments_divs:
            comments += comment_div.get_text() + '\n\n'

        likes = 'Likes information not extracted'

        lines = content.splitlines()
        filtered_lines = []

        remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
        remove_words_last_25 = [
            "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
        ]

        for i, line in enumerate(lines):
            if i < 20 and any(word in line for word in remove_words_first_20):
                continue
            filtered_lines.append(line)

        final_filtered_lines = []
        for i, line in enumerate(filtered_lines):
            if i >= len(filtered_lines) - 25 and any(word in line for word in remove_words_last_25):
                continue
            final_filtered_lines.append(line)

        filtered_content = '\n'.join(final_filtered_lines)

        return title, filtered_content, comments, likes
    else:
        return None, f'Error: Unable to fetch the article. Status code: {response.status_code}', '', ''

def scrape_medium_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_tag = soup.find('h1')
        title = title_tag.get_text() if title_tag else 'No title found'
        
        content = ''
        article_body = soup.find_all('p')
        for paragraph in article_body:
            content += paragraph.get_text() + '\n\n'
        
        comments_section = soup.find_all('div', class_='comment')
        likes_section = soup.find('button', class_='likeButton')
        
        comments = ''
        if comments_section is None or not comments_section:
            comments = ''
        else:
            for comment in comments_section:
                comments += comment.get_text() + '\n\n'
            
        likes = likes_section.get_text() if likes_section else 'No likes information found'
        
        lines = content.splitlines()
        filtered_lines = []
        
        remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
        remove_words_last_25 = [
            "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
        ]
        
        for i, line in enumerate(lines):
            if i < 20 and any(word in line for word in remove_words_first_20):
                continue
            filtered_lines.append(line)
        
        final_filtered_lines = []
        for i, line in enumerate(filtered_lines):
            if i >= len(filtered_lines) - 25 and any(word in line for word in remove_words_last_25):
                continue
            final_filtered_lines.append(line)
        
        filtered_content = '\n'.join(final_filtered_lines)
        
        return title, filtered_content, comments, likes
    else:
        return None, f'Error: Unable to fetch the article. Status code: {response.status_code}', '', ''

# LLMware Models
def get_summary(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-summary-tool") 
        #"llmware/slim-summary" <-use this model for better answers, but it is slow.
        response = slim_model.function_call(text, params=["key points (3)"], function="summarize")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_tags(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-tags-tool")
        response = slim_model.function_call(text, params=["tags"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_sentiment(comments):
    if comments != '':
        slim_model = ModelCatalog().load_model("slim-sentiment-tool")
        response = slim_model.function_call(comments, params=["sentiment"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_topic(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-topics-tool")
        response = slim_model.function_call(text, params=["topics"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_answer(text, question):
    if text is not None:
        questions = '"' + question + " (explain)" + '"' 
        slim_model = ModelCatalog().load_model("slim-boolean-tool")
        response = slim_model.function_call(text, params=[questions], function="boolean")
        return response["llm_response"]
    else:
        return "Invalid text"



class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_handler(request: ChatRequest):
    user_input = request.message.lower()
    print(user_input)
    await asyncio.sleep(2)
    if "hello" in user_input:
        return {
            "reply": "Hi there! How can I assist you with the article? 😊",
            "tour_required": False,
            "tour": None
        }
    
    elif "help" in user_input:
        return {
            "reply": "Our app streamlines research by giving you summaries, keyword insights, comment sentiment, and answers to your questions—all in one place. 📚✨ \n \n Use the Start Tour to see how it can save you time and boost productivity.",
            "tour_required": True,
            "tour": "about"
        }
    elif "guide" in user_input:
        return {
            "reply": "Sure! Let's start the tour.",
            "tour_required": True,
            "tour": "navbar"
        }
    elif "article" in user_input:
        return {
            "reply": "Absolutely! Our AI-powered summarization engine can quickly distill long articles into concise and easy-to-understand summaries. \n\n You can click the Start Tour button to see how article summarization works step by step.",
            "tour_required": True,
            "tour": "home"
        }

    elif "summarize" in user_input:
        return {
            "reply": "Please paste the article you'd like me to summarize. 📄",
            "tour_required": False,
            "tour": None
        }

    else:
        return {
            "reply": "I'm here to help with article insights. Ask me anything! 😊",
            "tour_required": False,
            "tour": None
        }


@app.post("/get_all/")
async def get_all(url: str = Form(...)):
    title, content, comments, likes = scrape_article(url)

    if title:
        text = '"' + content + '"'
        geminiModel = GeminiSummarizationModel(GEMINI_API_KEY)
        summary = geminiModel.function_call(text)#get_summary(text)
        print(summary)
        tags = "get_tags(text)"
        print(text)
        sentiment = "get_sentiment(comments)"
        print(sentiment)
        topic = "get_topic(text)"
        print(topic)

        return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})

    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")

@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...)):
    title, content, comments, likes = scrape_article(url)
    # print(url)
    if title:
        text = '"' + content + '"'

        if not question:
            raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")

        answer = get_answer(text, question)
        return JSONResponse({"answer": answer})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")
# http://127.0.0.1:8000/docs