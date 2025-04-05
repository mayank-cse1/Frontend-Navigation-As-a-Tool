import requests

class GeminiSummarizationModel:
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"

    def function_call(self, text, params=None, function=None):
        headers = {
            "Content-Type": "application/json"
        }

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"Summarize the following text:\n\n{text}"
                        }
                    ]
                }
            ]
        }

        response = requests.post(self.api_url, headers=headers, json=payload)

        if response.status_code == 200:
            try:
                return response.json()["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as e:
                raise Exception(f"Unexpected response format: {response.json()}") from e
        else:
            raise Exception(f"Error: {response.status_code}, {response.text}")