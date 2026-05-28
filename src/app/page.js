'use client';

import { useState } from 'react';
import Image from "next/image";
import ChatWindow from "./component/chatwindow";


export default function Home() {
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <ChatWindow messages={messages} />
    </div>
  );
}
