// Simple in-memory + localStorage-backed mock API for frontend pages

export type Message = { id: string; role: 'user' | 'assistant'; text: string };
export type Chat = { id: string; title: string; preview: string; date: string; pinned: boolean; messages: Message[] };
export type ChatSummary = Pick<Chat, 'id' | 'title' | 'preview' | 'date' | 'pinned'>;
export type DocumentItem = { id: string; name: string; size: string; category: 'All' | 'Financial' | 'Identity' | 'Shared'; uploadedAt: string };
export type DataSource = { id: string; name: string; status: 'connected' | 'not_connected' };
export type Profile = { name: string; username: string; email: string; avatarUrl?: string };

const LS_KEY = 'privacycopilot_mock_db_v1';

type DB = {
  profile: Profile;
  chats: Chat[];
  documents: DocumentItem[];
  dataSources: DataSource[];
};

function loadDB(): DB {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // Seed data
  const db: DB = {
    profile: {
      name: 'Alex Doe',
      username: 'alexdoe',
      email: 'alex.doe@example.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&w=256&h=256&q=80',
    },
    chats: [
      {
        id: 'c1',
        title: 'Social Media Privacy',
        preview: 'Assess my social media privacy exposure',
        date: '2025-07-02',
        pinned: true,
        messages: [
          { id: 'm1', role: 'assistant', text: "Hi! I'm your Privacy Copilot. How can I help?" },
          { id: 'm2', role: 'user', text: 'Analyze my social media privacy exposure.' },
          {
            id: 'm3',
            role: 'assistant',
            text:
              "Certainly. I've analyzed your connected accounts. Here is a summary of your data footprint...",
          },
        ],
      },
      {
        id: 'c2',
        title: 'Data Anonymization',
        preview: 'How to anonymize analytics events?',
        date: '2025-07-01',
        pinned: false,
        messages: [
          { id: 'm1', role: 'assistant', text: 'Let’s design an anonymization pipeline.' },
        ],
      },
    ],
    documents: [
      { id: 'd1', name: 'Privacy Policy v1.pdf', size: '240 KB', category: 'All', uploadedAt: '2025-06-14' },
      { id: 'd2', name: 'Cookie Policy.docx', size: '88 KB', category: 'All', uploadedAt: '2025-06-18' },
      { id: 'd3', name: 'DSAR Template.pdf', size: '132 KB', category: 'All', uploadedAt: '2025-06-22' },
      { id: 'd4', name: 'PIA-Finance.xlsx', size: '410 KB', category: 'Financial', uploadedAt: '2025-06-05' },
      { id: 'd5', name: 'ID-Verifications.zip', size: '2.1 MB', category: 'Identity', uploadedAt: '2025-05-30' },
    ],
    dataSources: [
      { id: 'twitter', name: 'Twitter/X', status: 'connected' },
      { id: 'facebook', name: 'Facebook', status: 'not_connected' },
      { id: 'google', name: 'Google', status: 'connected' },
      { id: 'linkedin', name: 'LinkedIn', status: 'not_connected' },
      { id: 'instagram', name: 'Instagram', status: 'not_connected' },
    ],
  };
  saveDB(db);
  return db;
}

function saveDB(db: DB) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(db));
  } catch (_) {}
}

let dbCache: DB | null = null;
function db(): DB {
  if (!dbCache) dbCache = loadDB();
  return dbCache;
}

// Utilities
function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Chats
export async function getChats(): Promise<ChatSummary[]> {
  return db().chats.map(({ id, title, preview, date, pinned }) => ({ id, title, preview, date, pinned }));
}

export async function getChat(chatId: string): Promise<Chat | null> {
  return db().chats.find((c) => c.id === chatId) || null;
}

export async function createChat(title = 'New Chat'): Promise<Chat> {
  const chat: Chat = { id: uuid(), title, preview: '', date: new Date().toISOString().slice(0, 10), pinned: false, messages: [] };
  db().chats.unshift(chat);
  saveDB(db());
  return chat;
}

export async function sendMessage(chatId: string, text: string) {
  const chat = db().chats.find((c) => c.id === chatId);
  if (!chat) throw new Error('Chat not found');
  const userMsg: Message = { id: uuid(), role: 'user', text };
  chat.messages.push(userMsg);
  chat.preview = text.slice(0, 80);
  chat.date = new Date().toISOString().slice(0, 10);
  saveDB(db());
  // Mock AI response
  await new Promise((r) => setTimeout(r, 500));
  const aiMsg: Message = { id: uuid(), role: 'assistant', text: 'This is a mocked response from Privacy Copilot.' };
  chat.messages.push(aiMsg);
  saveDB(db());
  return { user: userMsg, assistant: aiMsg };
}

export async function togglePin(chatId: string) {
  const chat = db().chats.find((c) => c.id === chatId);
  if (!chat) return;
  chat.pinned = !chat.pinned;
  saveDB(db());
  return chat.pinned;
}

// Documents
export async function getDocuments(filter: DocumentItem['category'] | 'All' = 'All') {
  if (filter === 'All') return db().documents;
  return db().documents.filter((d) => d.category === filter);
}

export async function addDocument(name: string, size = '—', category: DocumentItem['category'] | 'All' = 'All') {
  const doc: DocumentItem = { id: uuid(), name, size, category: (category as any), uploadedAt: new Date().toISOString().slice(0, 10) };
  db().documents.unshift(doc);
  saveDB(db());
  return doc;
}

// Data sources
export async function getDataSources(): Promise<DataSource[]> {
  return db().dataSources;
}

export async function connectSource(id: string) {
  const s = db().dataSources.find((x) => x.id === id);
  if (s) {
    s.status = 'connected';
    saveDB(db());
  }
  return s;
}

export async function disconnectSource(id: string) {
  const s = db().dataSources.find((x) => x.id === id);
  if (s) {
    s.status = 'not_connected';
    saveDB(db());
  }
  return s;
}

// Profile
export async function getProfile(): Promise<Profile> {
  return db().profile;
}

export async function updateProfile(patch: Partial<Profile>): Promise<Profile> {
  db().profile = { ...db().profile, ...patch };
  saveDB(db());
  return db().profile;
}

export default {
  getChats,
  getChat,
  createChat,
  sendMessage,
  togglePin,
  getDocuments,
  addDocument,
  getDataSources,
  connectSource,
  disconnectSource,
  getProfile,
  updateProfile,
};
