import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
            </svg>
          </div>
          <span className="font-display font-700 text-slate-800 text-[15px] font-bold hidden sm:block">
            SMS
          </span>
          <span className="font-display font-700 text-slate-800 text-[15px] font-bold sm:hidden">
            SMS
          </span>
        </NavLink>

        <ul className="flex items-center gap-1 list-none m-0 p-0">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all no-underline ${
                  isActive
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`
              }
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1L1 6.5V14h4.5v-4h4V14H14V6.5L7.5 1Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-student"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all no-underline ${
                  isActive
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`
              }
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7.5 4.5v6M4.5 7.5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Add Student
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}