'use client';

export default function ChatWindow({ messages }) {
  // If messages is not an array, return empty
  if (!Array.isArray(messages)) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-[#070707] p-4 sm:p-6">
        <p className="text-sm text-zinc-500">Start a conversation...</p>
      </div>
    );
  }

  // If no messages, show welcome
  if (messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-[#070707] p-4 sm:p-6">
        <p className="text-center text-sm text-zinc-500 sm:text-base">Start a conversation with Nexora AI...</p>
      </div>
    );
  }

  // Render messages
  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#070707] p-4 sm:p-6">
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
              className={`max-w-[85%] rounded-md border px-4 py-2.5 sm:max-w-[70%] lg:max-w-2xl ${
                msg.role === 'user'
                  ? 'border-emerald-400/40 bg-emerald-500 text-[#070707]'
                  : 'border-[#2a2b2a] bg-[#0f0f10] text-zinc-200'
              }`}
            >
              <p className="whitespace-pre-wrap break-words text-sm leading-6">{msg.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
