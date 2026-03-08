
# websocket-chat

A modern, full-stack real-time chat application with a bold, neon-inspired UI.

## Visual Overview

### Login Screen
![Login Screenshot](frontend/screenshot-login.png)

### Chat Interface
![Chat Screenshot](frontend/screenshot-chat.png)

## Architecture
- **Backend:** Node.js, Express, Socket.io for real-time messaging and user presence
- **Frontend:** React SPA, Socket.io-client, modern grid/neon UI
- Stateless, in-memory user tracking (demo)

## Installation
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npx webpack serve --mode development --open
```

## API Examples
- WebSocket events: `join`, `message`, `typing`, `onlineUsers`, `userJoined`, `userLeft`
- See backend and frontend READMEs for details

## Technologies Used
- Node.js, Express, Socket.io
- React, Socket.io-client
- Webpack, Babel

## Future Improvements
- Persistent user sessions and message history
- Authentication and security
- File/image sharing
- Responsive/mobile UI
