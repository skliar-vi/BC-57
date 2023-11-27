# Use an official Node.js runtime as a base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

ENV DB_HOST=mongodb+srv://admin:FgmHyXiWwePLuHrF@cluster0.uatqvqv.mongodb.net/library?retryWrites=true&w=majority
ENV DB_HOST_TEST=mongodb+srv://admin:FgmHyXiWwePLuHrF@cluster0.uatqvqv.mongodb.net/library_test?retryWrites=true&w=majority
ENV PORT=3000
ENV SECRET_KEY=6lrtRMU1nF
ENV BASE_URL="localhost:3000"
ENV SENDGRID_API_KEY="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"
ENV MAIL_USER=vsklyar4@gmail.com


# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
