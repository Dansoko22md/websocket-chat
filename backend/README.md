# Backend - websocket-chat

A Node.js backend for real-time chat using Socket.io.

## Architecture
- **Express.js** server for HTTP and WebSocket handling
- **Socket.io** for real-time messaging, user presence, and typing indicators
- Stateless, in-memory user tracking

## Installation
```bash
cd backend
npm install
npm start
```

## API Examples
- **WebSocket Events:**
  - `join` (username): Register a user
  - `message` (text): Send a chat message
  - `typing` (bool): Typing indicator
  - `onlineUsers`: List of online users
  - `userJoined`/`userLeft`: User presence notifications

## Technologies Used
- Node.js
- Express.js
- Socket.io
- CORS

## Future Improvements
- Persistent user sessions (Redis or DB)
- Authentication (JWT, OAuth)
- Message history storage
- Rate limiting & security enhancements
