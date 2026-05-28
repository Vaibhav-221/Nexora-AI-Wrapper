'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from './component/chatwindow';
import InputBox from './component/inputbox';
import Sidebar from './component/sidebar';
import Navbar from './component/navbar';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('mistral');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel,
          messages: updatedMessages
        })
      });

      const data = await response.json();

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message || 'No response' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: Could not connect to Ollama' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div>
      <Navbar />
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
    </div>
  );
}