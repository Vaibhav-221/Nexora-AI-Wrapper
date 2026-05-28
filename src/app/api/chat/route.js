export async function POST(request) {
  try {
    const { message, model, messages } = await request.json();

    // Build the conversation history for Ollama
    const conversationMessages = Array.isArray(messages)
      ? messages.map((msg) => ({
          role: msg.role,
          content: msg.content
        }))
      : [];

    // Add the current user message
    conversationMessages.push({
      role: 'user',
      content: message
    });

    // Call Ollama API
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: conversationMessages,
        stream: false
      })
    });

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to get response from Ollama' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const extractText = (value) => {
      if (typeof value === 'string') return value;
      if (value?.content && typeof value.content === 'string') return value.content;
      if (Array.isArray(value?.content)) {
        return value.content
          .map((item) => (typeof item === 'string' ? item : item?.text || item?.content || ''))
          .join(' ')
          .trim();
      }
      if (Array.isArray(value?.choices) && value.choices.length > 0) {
        const choice = value.choices[0];
        if (typeof choice?.text === 'string') return choice.text;
        if (typeof choice?.message?.content === 'string') return choice.message.content;
      }
      return '';
    };

    const assistantMessage =
      extractText(data.message) ||
      extractText(data.response) ||
      extractText(data) ||
      '';

    return Response.json({
      message: assistantMessage,
      role: 'assistant'
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}