import React from 'react';
import { getDocuments, addDocument, type DocumentItem } from '../mocks/api';

const CATEGORIES = ['All', 'Financial', 'Identity', 'Shared'];

export default function DocumentManagement() {
  const [category, setCategory] = React.useState('All');
  const [docs, setDocs] = React.useState<DocumentItem[]>([]);

  const refresh = async () => {
    const list = await getDocuments(category);
    setDocs(list);
  };
  React.useEffect(() => {
    refresh();
  }, [category]);

  const onAdd = async () => {
    const name = prompt('Enter document name (e.g. New Policy.pdf)');
    if (!name) return;
    await addDocument(name, '—', category === 'All' ? 'All' : category);
    refresh();
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="h-16 px-4 border-b border-gray-200 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-indigo-600" />
          <h2 className="font-bold">Privacy Copilot</h2>
        </div>
        <div className="p-4 space-y-1">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === c ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-gray-100'}`}>
              {c === 'All' ? 'All Documents' : c}
            </button>
          ))}
          <button onClick={onAdd} className="mt-3 w-full h-10 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300">Add Document</button>
        </div>
        <div className="mt-auto p-4">
          <div className="text-sm font-medium">Storage</div>
          <div className="h-2 rounded-full bg-gray-200 mt-2">
            <div className="h-2 rounded-full bg-indigo-600" style={{ width: '33%' }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">5 GB of 15 GB used</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold">My Documents</h1>
          <div className="flex items-center gap-2">
            <button onClick={onAdd} className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Upload</button>
            <button className="h-10 px-4 rounded-lg bg-gray-100 text-gray-700 text-sm">New Folder</button>
          </div>
        </header>
        <div className="p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-4">Uploaded</div>
            </div>
            <ul className="divide-y divide-gray-100">
              {docs.map((d) => (
                <li key={d.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                  <div className="col-span-6 flex items-center gap-2">
                    <span className="inline-block h-5 w-5 bg-gray-200 rounded" />
                    <span className="truncate" title={d.name}>{d.name}</span>
                  </div>
                  <div className="col-span-2 text-gray-500">{d.size}</div>
                  <div className="col-span-4 text-gray-500">{d.uploadedAt}</div>
                </li>
              ))}
              {docs.length === 0 && (
                <li className="px-4 py-6 text-sm text-gray-500">No documents in this category.</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
