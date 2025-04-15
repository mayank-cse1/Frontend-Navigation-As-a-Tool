FROM python:3.10-slim

WORKDIR /app

COPY backend/ /app

RUN python -m pip install --upgrade pip \
    && pip install --default-timeout=100 -r requirements.txt


CMD ["uvicorn", "api_article:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

