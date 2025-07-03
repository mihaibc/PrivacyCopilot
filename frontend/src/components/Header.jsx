import React from "react";

export default function Header({ sideMenuOpen, setSideMenuOpen, profileMenuOpen, setProfileMenuOpen, profileRef }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger menu icon using Heroicons outline */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={sideMenuOpen ? "Hide menu" : "Show menu"}
            onClick={() => setSideMenuOpen((open) => !open)}
            type="button"
          >
            {/* Heroicons: Bars3 */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white select-none">Privacy Copilot</span>
        </div>
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border hover:bg-accent/20 transition text-white focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setProfileMenuOpen((open) => !open)}
            title="Profile"
            type="button"
          >
            {/* Heroicons: UserCircle */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a8.38 8.38 0 0115 0" />
            </svg>
            <span className="profile-name hidden sm:inline">User</span>
            {/* Heroicons: ChevronDown */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-surface border border-border rounded-lg shadow-lg z-50 animate-fade-in">
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-accent/20 text-white rounded-t-lg transition" title="Edit Profile" type="button">
                {/* Heroicons: PencilSquare */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 113.02 2.92L7.5 19.793 3 21l1.207-4.5 12.655-12.013z" />
                </svg>
                Edit Profile
              </button>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-accent/20 text-white rounded-b-lg transition" title="Sign Out" type="button">
                {/* Heroicons: ArrowRightOnRectangle */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12h-9m0 0l3-3m-3 3l3 3" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
