import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isError
            ? '#fee'
            : isUser
            ? '#007bff'
            : '#f1f3f4',
          color: isError ? '#c00' : isUser ? 'white' : '#202124',
          fontSize: '14px',
          lineHeight: '1.5',
          wordWrap: 'break-word',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>
        <div
          style={{
            fontSize: '10px',
            marginTop: '4px',
            opacity: 0.7,
            textAlign: 'right'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
