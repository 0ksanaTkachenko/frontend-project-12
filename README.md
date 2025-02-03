### Hexlet tests and linter status:

[![Actions Status](https://github.com/0ksanaTkachenko/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-12/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/9902d75480c48d3e1381/maintainability)](https://codeclimate.com/github/0ksanaTkachenko/frontend-project-12/maintainability)

[![ESLint Status](https://github.com/0ksanaTkachenko/frontend-project-12/actions/workflows/eslint.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-12/actions)

## Access the Application

[Check out the deployed application here](https://frontend-project-12-nhl0.onrender.com/)

# Chat

## About the Project

Chat is a web application for messaging, built using a modern technology stack. It allows users to communicate in real-time across various channels. To use the chat, users must authenticate via JWT technology. The application also includes features for creating, editing, and deleting channels, as well as filtering messages with profanity.

## Technologies

- **Vite** —  for fast development and project bundling.
- **React** — for building the user interface.
- **Formik** — for form creation and management.
- **Yup** —  for form validation.
- **Redux Toolkit** — for state management.
- **WebSockets** — for real-time messaging.
- **JWT** — for authentication and authorization.
- **i18n** — for application internationalization.
- **React Toastify** — for implementing toast notifications.
- **Leo Profanity** — for profanity filtering.
- **Rollbar** — for error tracking in the application.

## Application Features

1. **Authentication and Authorization**:
   - Authentication via a form implemented with Formik.
   - Using JWT to protect chat pages.
   - Checking the token in LocalStorage to restrict access.

2. **Channel Management**:
   - Switching between channels.
   - Creating a new channel with a unique name validation.
   - Renaming a channel through a modal window.
   - Deleting a channel with confirmation.
   - Automatically switching to the General channel after deleting the current channel.

3. **Messaging**:
   - Sending messages via POST requests.
   - Receiving messages in real-time via WebSockets.
   - Handling network errors and delays.

4. **Internationalization**:
   - Default locale set to English.
   - Using the i18n library for all interface texts.

5. **Toast Notifications**:
   - Notifications for data loading errors or network issues.
   - Notifications for successful actions such as channel creation, renaming, and deletion.

6. **Profanity Filtering**:
   - Using the Leo Profanity library to filter messages and channel names.

7. **Error Tracking**:
   - Integrating Rollbar to monitor errors in production.

## Deployment

The application is deployed on [Rollbar](https://frontend-project-12-nhl0.onrender.com/).

## Installation and Running

1. **Clone the project repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd <project-directory>
   ```

3. **Install dependencies for both client and server:**
   ```bash
   make install
   ```

4. **Run the project in development mode:**
   ```bash
   make local
   ```

5. **Build the client application for production:**
   ```bash
   make build
   ```

6. **Start the application in production:**
   ```bash
   make start