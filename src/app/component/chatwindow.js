'use client';

export default function ChatWindow({ messages }) {
  // If messages is not an array, return empty
  if (!Array.isArray(messages)) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Start a conversation...</p>
      </div>
    );
  }

  // If no messages, show welcome
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Start a conversation with Nexora AI...</p>
      </div>
    );
  }

  // Render messages
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
      {messages.map((msg, index) => {
        // Safety check
        if (!msg || !msg.content) {
          return <div key={index}></div>;
        }

        return (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-100'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}