FROM node:18

# Set working directory
WORKDIR /app

# Copy ONLY package.json and yarn.lock from frontend folder
COPY ./frontend/package.json ./frontend/yarn.lock ./

# Install dependencies
RUN yarn install

# Now copy the rest of the frontend code
COPY ./frontend .

# Expose Vite's dev server port
EXPOSE 5173

# Run the Vite dev server
CMD ["yarn", "dev"]
