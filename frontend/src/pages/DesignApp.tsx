import React from 'react';
import ChatInterface from './ChatInterface';
import ChatHistory from './ChatHistory';
import DocumentManagement from './DocumentManagement';
import DataSources from './DataSources';
import ProfileSettings from './ProfileSettings';
import WelcomeSetup from './WelcomeSetup';

type Route = { key: string; label: string; hash: string };
const routes: Route[] = [
  { key: 'welcome', label: 'Welcome', hash: '#/welcome' },
  { key: 'chat', label: 'Chat', hash: '#/chat' },
  { key: 'history', label: 'History', hash: '#/history' },
  { key: 'documents', label: 'Documents', hash: '#/documents' },
  { key: 'data-sources', label: 'Data Sources', hash: '#/data-sources' },
  { key: 'profile', label: 'Profile', hash: '#/profile' },
];

function useHashRoute(defaultKey = 'chat') {
  const [route, setRoute] = React.useState<string>(() => {
    const key = window.location.hash.replace('#/', '') || defaultKey;
    return routes.find((r) => r.key === key)?.key || defaultKey;
  });
  React.useEffect(() => {
    const onHash = () => {
      const key = window.location.hash.replace('#/', '') || defaultKey;
      setRoute(routes.find((r) => r.key === key)?.key || defaultKey);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [defaultKey]);
  return [route, (key: string) => (window.location.hash = `#/${key}`)] as const;
}

export default function DesignApp() {
  const [route, navigate] = useHashRoute('chat');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-indigo-600"></div>
            <h1 className="text-xl font-bold">Privacy Copilot</h1>
          </div>
          <nav className="flex items-center gap-2">
            {routes.map((r) => (
              <a
                key={r.key}
                href={r.hash}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  route === r.key ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {r.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)]">
        {route === 'welcome' && <WelcomeSetup onGetStarted={() => navigate('data-sources')} />}
        {route === 'chat' && <ChatInterface />}
        {route === 'history' && <ChatHistory />}
        {route === 'documents' && <DocumentManagement />}
        {route === 'data-sources' && <DataSources />}
        {route === 'profile' && <ProfileSettings />}
      </main>
    </div>
  );
}
