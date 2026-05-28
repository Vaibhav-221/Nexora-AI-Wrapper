'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from './component/chatwindow';
import InputBox from './component/inputbox';
import Sidebar from './component/sidebar';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('mistral');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available models on mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags');
        const data = await response.json();
        setModels(data.models || []);
        if (data.models?.length > 0) {
          setSelectedModel(data.models[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };

    fetchModels();
  }, []);

  // Handle sending message
  const handleSendMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel,
          messages: messages
        })
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: Could not get response' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new chat
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        models={models}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} />
        <InputBox onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}