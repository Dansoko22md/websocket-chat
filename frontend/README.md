# Frontend - websocket-chat

A modern React frontend for real-time chat, inspired by bold, dark, neon UI design.

## Architecture
- **React** SPA (Single Page Application)
- **Socket.io-client** for real-time WebSocket communication
- Modern, grid-based, neon-highlighted UI

## Installation
```bash
cd frontend
npm install
npx webpack serve --mode development --open
```

## API Examples
- Connects to backend at `http://localhost:5000`
- Emits/receives events: `join`, `message`, `typing`, `onlineUsers`, `userJoined`, `userLeft`

## Technologies Used
- React
- Socket.io-client
- Webpack, Babel
- Modern CSS-in-JS (inline styles)

## Future Improvements
- Responsive/mobile layout
- File/image sharing
- User avatars
- Theme customization
- Accessibility enhancements
