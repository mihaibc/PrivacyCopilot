import React from 'react';
import { getProfile, updateProfile, type Profile } from '../mocks/api';

export default function ProfileSettings() {
  const [form, setForm] = React.useState<Pick<Profile, 'name' | 'username' | 'email'>>({ name: '', username: '', email: '' });
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const p = await getProfile();
      setForm({ name: p.name, username: p.username, email: p.email });
    })();
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-black tracking-tight">Profile Information</h1>
        </header>
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-base font-semibold">Profile Picture</div>
              <div className="text-sm text-gray-500">Update your profile picture. Recommended size: 400x400px.</div>
              <div className="mt-3 flex gap-2">
                <button className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium">Upload New Picture</button>
                <button className="h-10 px-4 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium">Remove</button>
              </div>
            </div>
            <div className="h-32 w-32 rounded-lg bg-gray-200" />
          </div>
        </section>
        <form onSubmit={onSave} className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-bold">Personal Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-lg border border-gray-300 px-3 focus:border-indigo-500 outline-none" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Username</span>
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="h-11 rounded-lg border border-gray-300 px-3 focus:border-indigo-500 outline-none" />
            </label>
            <label className="sm:col-span-2 flex flex-col gap-1">
              <span className="text-sm font-medium">Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 rounded-lg border border-gray-300 px-3 focus:border-indigo-500 outline-none" />
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="h-10 px-4 rounded-lg bg-gray-100 text-gray-800 text-sm">Cancel</button>
            <button type="submit" className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Save Changes</button>
          </div>
          {saved && <div className="text-sm text-green-600">Saved!</div>}
        </form>
      </div>
    </div>
  );
}
