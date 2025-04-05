
---

# FRONTEND-NAVIGATION-AS-A-TOOL: Guided Tour of Your Article Analysis Tool
<p align="center">
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/" target="blank">
<img src="https://img.shields.io/github/watchers/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="Watchers"/>
</a>
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/fork" target="blank">
<img src="https://img.shields.io/github/forks/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="Forks"/>
</a>
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/stargazers" target="blank">
<img src="https://img.shields.io/github/stars/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="Star"/>
</a>
</p>
<p align="center">
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/issues" target="blank">
<img src="https://img.shields.io/github/issues/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="Issue"/>
</a>
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/pulls" target="blank">
<img src="https://img.shields.io/github/issues-pr/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
</a>
</p>
<p align="center">
<a href="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/blob/master/LICENSE" target="blank">
<img src="https://img.shields.io/github/license/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL?style=for-the-badge&logo=appveyor" alt="License" />
</a>
</p>

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Content Categorization](#content-categorization)
  - [Article Summarization](#article-summarization)
  - [Tag Generation](#tag-generation)
  - [Sentiment Analysis](#sentiment-analysis)
  - [Question Answering](#question-answering)
  - [Interactive Guided Tour](#interactive-guided-tour)
- [Supported Platforms](#supported-platforms)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Dependencies](#dependencies)
- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)



## Overview

FRONTEND-NAVIGATION-AS-A-TOOL is an innovative web application that enhances the user experience by providing a comprehensive and interactive analysis of articles, coupled with an intuitive guided tour powered by Shepherd.js. The guided tour feature aims to familiarize users with the application's functionalities, ensuring a seamless and efficient exploration of its capabilities.

FRONTEND-NAVIGATION-AS-A-TOOL leverages advanced natural language processing (NLP) techniques to deliver accurate and insightful analyses of articles from popular platforms such as Dev.to and Medium. However, the standout feature of FRONTEND-NAVIGATION-AS-A-TOOL is its interactive guided tour, which guides users through the application's various components and features, providing step-by-step instructions and highlighting key elements of the user interface.

## Key Features

### Interactive Guided Tour

The cornerstone of FRONTEND-NAVIGATION-AS-A-TOOL is its interactive guided tour, implemented using the Shepherd.js library. This feature provides users with a step-by-step walkthrough of the application's functionalities, ensuring they can navigate and utilize the tool effectively. The tour highlights key features, explains their purpose, and guides users through the application's workflow, making the user experience seamless and intuitive.

Throughout the application, users will encounter a "Guide Me" button, which initiates the guided tour. This tour is designed to be context-aware, presenting relevant information and instructions based on the user's current location within the application.

### Content Categorization

FRONTEND-NAVIGATION-AS-A-TOOL's intelligent categorization system employs advanced algorithms to classify articles into relevant categories, ensuring users can quickly identify and access content that aligns with their interests. This feature streamlines content discovery and enables users to explore specific domains more efficiently.

### Article Summarization

Recognizing the need for concise and digestible information, FRONTEND-NAVIGATION-AS-A-TOOL offers a powerful summarization feature. By leveraging cutting-edge language models, the application generates comprehensive yet succinct summaries of articles, allowing users to quickly grasp the main ideas and key points without having to read through lengthy content.

### Tag Generation

Effective tagging is crucial for enhancing discoverability and organizing content. FRONTEND-NAVIGATION-AS-A-TOOL's tag generation feature uses advanced NLP techniques to automatically generate relevant tags for articles, ensuring that users can easily find and navigate related content based on their interests.

### Sentiment Analysis

Understanding the sentiment behind comments and feedback is essential for gauging public opinion and sentiment towards a particular topic or article. FRONTEND-NAVIGATION-AS-A-TOOL's sentiment analysis feature leverages advanced machine learning models to analyze comments and determine the overall sentiment, providing users with valuable insights into how their content is being received.

### Question Answering

FRONTEND-NAVIGATION-AS-A-TOOL's question answering feature empowers users to obtain precise and contextual answers to their questions about an article's content. By leveraging deep learning models trained on vast knowledge bases, the application can provide accurate and relevant responses, enhancing the user's understanding of the subject matter.

With the interactive guided tour as the central focus, FRONTEND-NAVIGATION-AS-A-TOOL aims to provide users with a comprehensive and user-friendly experience, guiding them through the application's powerful features and empowering them to extract meaningful insights from written content effortlessly.

## Supported Platforms

Initially, FRONTEND-NAVIGATION-AS-A-TOOL supports articles from two popular platforms: Dev.to and Medium. Users can simply provide the URL of an article from either of these platforms, and FRONTEND-NAVIGATION-AS-A-TOOL will process the content, generating insightful analyses and summaries.

## Getting Started

FRONTEND-NAVIGATION-AS-A-TOOL offers a user-friendly interface that allows users to easily input article URLs and access the various features provided by the application. With its powerful AI-driven capabilities and the added benefit of an interactive guided tour, FRONTEND-NAVIGATION-AS-A-TOOL aims to revolutionize the way users consume and engage with written content, empowering them to make informed decisions and gain deeper insights effortlessly.

## Demo

<video src="https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/assets/89499267/a68e39d7-f624-4570-bc8b-c5791fbef380"></video>

## Dependencies
- React
- Uvicorn
- Yarn
- FastAPI
- Python
- Shepherd.js

## Installation

### Clone the Repository
```bash
git clone https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL.git
```

### Frontend Setup

#### Navigate to the frontend directory:
```bash
cd FRONTEND-NAVIGATION-AS-A-TOOL/frontend
```

#### Install dependencies:
```bash
yarn install
```

#### Start the development server:
```bash
yarn run dev
```

### Backend Setup

#### Navigate to the backend directory:
```bash
cd ../backend
```

#### Set up a virtual environment (recommended):
```bash
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

#### Install dependencies:
```bash
pip install -r requirements.txt
```

**Note**: The initial setup might take some time as it involves downloading several models.

#### Start the API server:
```bash
uvicorn api_article:app --reload
```

## Usage

#### Visit the frontend application:
Open your browser and navigate to `http://localhost:5173`.

#### Make sure the backend is running at:
`http://localhost:8000`.

## Screenshots
<!-- Add your screenshots here -->
Landing Page:
![landing](https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/assets/89499267/2b0b0623-97e3-44e8-9439-e4f00f66217d)
Home Page:
![home](https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/assets/89499267/398ad7a6-7d3c-4bcf-83a9-76f34d0f8478)
ArticleSummary:
![article](https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/assets/89499267/f4f9395a-1b60-4485-a11a-217a369468c8)

About Section:
![about](https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL/assets/89499267/33971a22-1264-4c3f-848e-339e139c5f9d)

## Contributing

We welcome contributions from the community! If you'd like to contribute to ShepherdInsight, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/mayank-cse1/FRONTEND-NAVIGATION-AS-A-TOOL.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Shepherd.js](https://shepherdjs.dev/) for the interactive guided tour library
- [React](https://reactjs.org/) for the amazing JavaScript library
- [Yarn](https://yarnpkg.com/) for the reliable package manager
- [FastAPI](https://fastapi.tiangolo.com/) for the fast and efficient web framework
- [Python](https://www.python.org/) for the versatile programming language

---

