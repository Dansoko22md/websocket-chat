import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function App() {
  const [username, setUsername] = useState('');
  const [inputName, setInputName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const typingTimeout = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUser]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });
    socket.on('userJoined', (user) => {
      setMessages((prev) => [...prev, { user: 'System', text: `${user} joined the chat` }]);
    });
    socket.on('userLeft', (user) => {
      setMessages((prev) => [...prev, { user: 'System', text: `${user} left the chat` }]);
    });
    socket.on('typing', ({ user, isTyping }) => {
      setTypingUser(isTyping ? user : '');
    });
    
    return () => {
      socket.off('message');
      socket.off('onlineUsers');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('typing');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUsername(inputName.trim());
      socket.emit('join', inputName.trim());
    }
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
      setIsTyping(false);
      socket.emit('typing', false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', true);
    }
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', false);
    }, 1000);
  };

  // --- Login Screen ---
  if (!username) {
    return (
      <div className="app-container login-mode">
        <div className="login-card">
          <h1 className="serif-title">
            Join the <br />
            <i style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Chat</i>
          </h1>

          <div className="login-form-container" style={{ marginTop: '2rem' }}>
            <div className="header-pill">Identification</div>
            <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter your username..."
                autoFocus
              />
              <button type="submit" className="btn-black">Join</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Chat Interface ---
  return (
    <div className="app-container">
      <div className="chat-layout">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="serif-title">ONLINE</h2>
          <div>
            <div className="active-db-text" style={{ marginBottom: '10px' }}>
              CONNECTED USERS • {onlineUsers.length}
            </div>
            <ul className="user-list">
              {onlineUsers.map((user, i) => (
                <li key={i} className={`user-pill ${user === username ? 'current-user' : ''}`}>
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="chat-main">
          <div className="chat-header">
            <span className="chat-header-title">GENERAL CHAT</span>
            {typingUser && <span className="chat-header-title" style={{ color: 'var(--accent-gold)' }}>{typingUser} is typing...</span>}
          </div>

          <div className="messages-container">
            {messages.map((msg, i) => {
              const isMe = msg.user === username;
              const isSystem = msg.user === 'System';

              if (isSystem) {
                return (
                  <div key={i} className="message system-message">
                    <span>{msg.text}</span>
                  </div>
                );
              }

              return (
                <div key={i} className={`message ${isMe ? 'my-message' : 'other-message'}`}>
                  {!isMe && <span className="message-sender">{msg.user}</span>}
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{formatTime(Date.now())}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={message}
              onChange={handleTyping}
              placeholder="Type a message..."
              autoComplete="off"
            />
            {/* Send Button */}
            <button type="submit" disabled={!message.trim()} aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </main>
      </div>

      <footer className="app-footer">
        <a href="https://github.com/Dansoko22md" target="_blank" rel="noopener noreferrer">Moussa Dansoko</a> | github.com/Dansoko22md
      </footer>
    </div>
  );
}

export default App;