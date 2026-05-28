'use client';

import React, { useState } from 'react';

export default function InputBox({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#2a2b2a] bg-[#0f0f10] p-3 sm:p-4">
      <div className="mx-auto flex w-full max-w-4xl gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Type your message..."
          className="min-w-0 flex-1 rounded-md border border-[#2a2b2a] bg-[#070707] px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-orange-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="shrink-0 rounded-md border border-orange-400/50 bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#070707] shadow-[0_8px_24px_rgba(249,115,22,0.18)] transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}
