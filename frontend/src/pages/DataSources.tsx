import React from 'react';
import { getDataSources, connectSource, disconnectSource, type DataSource } from '../mocks/api';

export default function DataSources() {
  const [sources, setSources] = React.useState<DataSource[]>([]);
  React.useEffect(() => {
    (async () => setSources(await getDataSources()))();
  }, []);

  const toggle = async (id: string, status: DataSource['status']) => {
    if (status === 'connected') await disconnectSource(id);
    else await connectSource(id);
    setSources(await getDataSources());
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-black tracking-tight">Connected Data Sources</h1>
          <button className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Add Source</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gray-100" />
                  <div className="font-semibold">{s.name}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${s.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{s.status === 'connected' ? 'Connected' : 'Not connected'}</span>
              </div>
              <button onClick={() => toggle(s.id, s.status)} className={`h-10 rounded-lg text-sm font-semibold ${s.status === 'connected' ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white'}`}>
                {s.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
