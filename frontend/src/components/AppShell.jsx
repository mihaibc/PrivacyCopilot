import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

// Removed unused navigation array
const teams = [
  { id: 1, name: 'Heroicons', initials: 'H' },
  { id: 2, name: 'Tailwind Labs', initials: 'T' },
  { id: 3, name: 'Workcation', initials: 'W' },
]


import React from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AppShell() {
  // --- State for features ---
  const [messages, setMessages] = React.useState([
    { text: "Hi! I'm your Privacy Copilot. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);
  const [page, setPage] = React.useState("chat");
  const [theme, setThemeState] = React.useState("light");
  const [history] = React.useState([
    {
      id: 1,
      title: "GDPR Compliance Chat",
      preview: "How do I make my app GDPR compliant?",
      date: "2025-07-01",
    },
    {
      id: 2,
      title: "Data Anonymization",
      preview: "Show me how to anonymize user data.",
      date: "2025-07-02",
    },
  ]);
  const chatEndRef = React.useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setIsThinking(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: "This is a mock response from your Copilot.", isUser: false },
      ]);
      setIsThinking(false);
    }, 900);
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // --- UI ---
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex flex-col w-72 bg-gray-900 rounded-2xl m-2">
        <div className="flex h-16 items-center px-6">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Privacy Copilot"
          />
        </div>
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            <li>
              <button onClick={() => setPage("chat")}
                className={classNames(page === "chat" ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white', 'group flex items-center px-4 py-2 text-sm font-medium rounded-md w-full text-left')}
              >
                <HomeIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setPage("history")}
                className={classNames(page === "history" ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white', 'group flex items-center px-4 py-2 text-sm font-medium rounded-md w-full text-left')}
              >
                <DocumentDuplicateIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                History
              </button>
            </li>
            <li>
              <button onClick={() => setPage("settings")}
                className={classNames(page === "settings" ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white', 'group flex items-center px-4 py-2 text-sm font-medium rounded-md w-full text-left')}
              >
                <Cog6ToothIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                Settings
              </button>
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Your teams</h3>
            <ul className="mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href="#"
                    className="group flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-gray-300 mr-3">
                      {team.initials}
                    </span>
                    <span>{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col rounded-2xl m-2 bg-white">
        {/* Header */}
        <header className="flex items-center h-16 px-8 border-b border-gray-200">
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search"
                className="block w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m2-5A7 7 0 1 1 3 10a7 7 0 0 1 14 0Z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <button className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 19a2 2 0 1 1-4 0m-7-5a7 7 0 0 1 14 0v2a2 2 0 0 0 2 2H5a2 2 0 0 1-2-2v-2Z" />
              </svg>
            </button>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-x-2 text-sm font-medium text-gray-900 focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span>Tom Cook</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 20 20">
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Your Profile</a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Settings</a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Sign out</a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        {/* Main content area */}
        <main className="flex-1 p-8">
          {page === "chat" && (
            <div className="h-full w-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 flex flex-col" style={{ minHeight: '500px' }}>
              <div className="flex-1 overflow-y-auto p-6">
                {messages.map((msg, i) => (
                  <div key={i} className={msg.isUser ? 'flex justify-end mb-2' : 'flex justify-start mb-2'}>
                    <div className={msg.isUser ? 'bg-indigo-100 text-indigo-900 rounded-lg px-4 py-2 max-w-xl' : 'bg-white text-gray-900 rounded-lg px-4 py-2 max-w-xl border'}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start mb-2">
                    <div className="bg-white text-gray-400 rounded-lg px-4 py-2 max-w-xl border animate-pulse">I'm thinking...</div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form className="flex items-center gap-2 border-t border-gray-200 p-4" onSubmit={handleSend}>
                <input
                  type="text"
                  className="flex-1 rounded-full border border-gray-300 bg-white py-2 px-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isThinking}
                  autoFocus
                />
                <button className="bg-indigo-600 text-white rounded-full px-6 py-2 font-semibold disabled:opacity-50" type="submit" disabled={isThinking || !input.trim()}>
                  Send
                </button>
              </form>
            </div>
          )}
          {page === "history" && (
            <div className="h-full w-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8" style={{ minHeight: '500px' }}>
              <h2 className="text-2xl font-semibold mb-4">Chat History</h2>
              <ul className="space-y-4">
                {history.map((chat) => (
                  <li key={chat.id} className="p-4 bg-white rounded-lg shadow border">
                    <div className="font-semibold text-gray-900">{chat.title}</div>
                    <div className="text-gray-500 text-sm">{chat.preview}</div>
                    <div className="text-gray-400 text-xs mt-1">{chat.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {page === "settings" && (
            <div className="h-full w-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8" style={{ minHeight: '500px' }}>
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <form className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Theme</span>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    value={theme}
                    onChange={e => setThemeState(e.target.value)}
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Enable Notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Privacy Mode</span>
                </label>
                <label className="block">
                  <span className="text-gray-700">Language</span>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Show Avatars</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Enable Chat History</span>
                </label>
                <label className="block">
                  <span className="text-gray-700">Default Chat Model</span>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                    <option>GPT-4</option>
                    <option>GPT-3.5</option>
                    <option>Custom</option>
                  </select>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Use Compact Layout</span>
                </label>
                <label className="block">
                  <span className="text-gray-700">Font Size</span>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </label>
                <div className="flex gap-4 pt-2">
                  <button className="bg-gray-200 text-gray-700 rounded px-4 py-2 font-semibold" type="button">Clear All Chat History</button>
                  <button className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold" type="button">Export Data</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
