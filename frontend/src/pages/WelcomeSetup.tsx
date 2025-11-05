import React from 'react';

export default function WelcomeSetup({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="text-sm font-medium text-gray-700">Step 1 of 4</div>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
            <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '25%' }} />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="h-32 w-32 rounded-full bg-indigo-50 grid place-items-center">
              <div className="h-24 w-24 rounded-full bg-indigo-100 grid place-items-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                  <path d="M12 3l8 4v5c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">Welcome to Privacy Copilot</h1>
            <p className="text-sm text-gray-600 mt-2">Let's set up your personalized privacy shield in just a few steps.</p>
          </div>
          <div className="mt-6">
            <button onClick={onGetStarted} className="w-full h-12 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500">Get Started</button>
            <div className="mt-3 text-sm text-gray-500 text-center underline underline-offset-2 cursor-pointer">Learn more</div>
          </div>
        </div>
      </div>
    </div>
  );
}
