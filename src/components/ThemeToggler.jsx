"use client"

import { useTheme } from "../contexts/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <div className="theme-icon">
            {theme === "light" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </div>
        </div>
        <div className="theme-toggle-bg">
          <div className="theme-bg-light">☀️</div>
          <div className="theme-bg-dark">🌙</div>
        </div>
      </div>

      <style jsx>{`
        .theme-toggle-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle-btn:hover {
          background: var(--theme-toggle-hover);
          transform: scale(1.05);
        }

        .theme-toggle-track {
          position: relative;
          width: 60px;
          height: 32px;
          background: var(--theme-toggle-bg);
          border-radius: 20px;
          border: 2px solid var(--theme-toggle-border);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: var(--theme-toggle-shadow);
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 2px;
          left: ${theme === "light" ? "2px" : "26px"};
          width: 24px;
          height: 24px;
          background: var(--theme-toggle-thumb);
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--theme-toggle-thumb-shadow);
          z-index: 2;
        }

        .theme-icon {
          color: var(--theme-toggle-icon);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .theme-toggle-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px;
          font-size: 12px;
          z-index: 1;
        }

        .theme-bg-light,
        .theme-bg-dark {
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .theme-bg-light {
          opacity: ${theme === "light" ? "0" : "0.6"};
        }

        .theme-bg-dark {
          opacity: ${theme === "dark" ? "0" : "0.6"};
        }

        .theme-toggle-btn:active .theme-toggle-track {
          transform: scale(0.95);
        }

        .theme-toggle-btn:hover .theme-toggle-thumb {
          transform: scale(1.1);
        }
      `}</style>
    </button>
  )
}

export default ThemeToggle
