import React from 'react';
import { getChats, togglePin, type ChatSummary } from '../mocks/api';

export default function ChatHistory() {
  const [chats, setChats] = React.useState<ChatSummary[]>([]);
  const [filter, setFilter] = React.useState<'all' | 'pinned'>('all');
  const [query, setQuery] = React.useState('');

  const refresh = async () => {
    const list = await getChats();
    setChats(list);
  };
  React.useEffect(() => {
    refresh();
  }, []);

  const filtered = chats
    .filter((c) => (filter === 'pinned' ? c.pinned : true))
    .filter((c) => [c.title, c.preview].join(' ').toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left profile/nav panel (lightweight for now) */}
      <aside className="w-80 flex-shrink-0 bg-white/60 border-r border-gray-200 p-4 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-500">john.doe@email.com</div>
          </div>
        </div>
        <nav className="mt-6 space-y-1">
          <a className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700" href="#/history">
            <span className="material-symbols-outlined">history</span>
            <span className="text-sm font-medium">Chat History</span>
          </a>
          <a className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100" href="#/chat">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Chat</span>
          </a>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100" href="#/profile">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </div>
      </aside>

      {/* History list */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Chat History</h2>
        </div>
        <div className="p-4 flex items-center gap-3 border-b border-gray-100">
          <div className="flex rounded-md overflow-hidden border border-gray-200">
            <input
              className="px-3 py-2 text-sm outline-none"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>All</button>
            <button onClick={() => setFilter('pinned')} className={`px-3 py-1.5 rounded-md text-sm ${filter === 'pinned' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Pinned</button>
          </div>
        </div>
        <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((chat) => (
            <div key={chat.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-gray-900 truncate max-w-[16rem]" title={chat.title}>{chat.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-[16rem]" title={chat.preview}>{chat.preview || '—'}</div>
                </div>
                <button
                  className={`px-2 py-1 rounded text-xs ${chat.pinned ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
                  onClick={async () => {
                    await togglePin(chat.id);
                    refresh();
                  }}
                >
                  {chat.pinned ? 'Pinned' : 'Pin'}
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-400">{chat.date}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500">No conversations found.</div>
          )}
        </div>
      </main>
    </div>
  );
}
