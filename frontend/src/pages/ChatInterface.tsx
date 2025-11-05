import React from 'react';
import { getChats, getChat, createChat, sendMessage, type ChatSummary, type Chat } from '../mocks/api';

export default function ChatInterface() {
  const [chats, setChats] = React.useState<ChatSummary[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Chat['messages']>([]);
  const [search, setSearch] = React.useState('');
  const [input, setInput] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    (async () => {
      const list = await getChats();
      setChats(list);
      if (list.length) {
        setActiveId(list[0].id);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!activeId) return;
    (async () => {
      const chat = await getChat(activeId);
      setMessages(chat?.messages || []);
    })();
  }, [activeId]);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const onNewChat = async () => {
    const chat = await createChat('New Chat');
    const list = await getChats();
    setChats(list);
    setActiveId(chat.id);
  };

  const onSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeId) return;
    setSending(true);
    await sendMessage(activeId, input.trim());
    const chat = await getChat(activeId);
    setMessages(chat?.messages || []);
    setInput('');
    setSending(false);
  };

  const quick = [
    'What are my privacy risks?',
    'Secure my accounts',
    'Explain data brokers',
  ];

  const filtered = chats.filter((c) =>
    [c.title, c.preview].join(' ').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-white/60 backdrop-blur-sm p-4 flex flex-col">
        <div className="flex items-center gap-3 pb-4">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">PC</div>
          <div>
            <h2 className="text-base font-semibold">Privacy Copilot</h2>
            <p className="text-xs text-gray-500">Your Data Control Center</p>
          </div>
        </div>
        <button onClick={onNewChat} className="w-full h-10 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500">
          New Chat
        </button>
        <div className="mt-4">
          <div className="flex rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <div className="px-3 flex items-center text-gray-400">{/* search icon */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="m19 19-4-4m2-5A7 7 0 1 1 3 10a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations" className="flex-1 bg-gray-100 text-sm px-2 py-2 outline-none" />
          </div>
        </div>
        <div className="mt-3 flex-1 overflow-y-auto space-y-1">
          {filtered.map((c) => (
            <button key={c.id} onClick={() => setActiveId(c.id)} className={`w-full text-left px-3 py-2 rounded-lg flex flex-col hover:bg-gray-100 ${activeId === c.id ? 'bg-indigo-50 ring-1 ring-indigo-200' : ''}`}>
              <div className="text-sm font-medium text-gray-900 truncate">{c.title}</div>
              <div className="text-xs text-gray-500 truncate">{c.preview || '—'}</div>
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-200"></div>
          <div>
            <div className="text-sm font-medium">Alex Morgan</div>
            <div className="text-xs text-gray-500">alex.m@example.com</div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold">Conversation</h3>
            <p className="text-xs text-gray-500">Your conversations are secure and private.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">Summarize</button>
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">Share</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-900'} rounded-xl px-4 py-2 max-w-[80%]`}>{m.text}</div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-500 rounded-xl px-4 py-2">Thinking…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex gap-3 mb-3 max-w-3xl mx-auto">
            {quick.map((q) => (
              <button key={q} onClick={() => setInput(q)} className="flex-1 text-sm px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700">
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={onSend} className="relative max-w-3xl mx-auto">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your privacy..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 pr-14 text-base focus:border-indigo-500 focus:outline-none"
            />
            <button disabled={!input.trim() || sending} className="absolute bottom-3 right-3 h-9 w-9 rounded-lg bg-indigo-600 text-white disabled:bg-gray-400 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
