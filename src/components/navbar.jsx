import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import ThemeToggle from "./ThemeToggler"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Image enhancement completed", time: "2 min ago", read: false },
    { id: 2, message: "New feature: Batch processing", time: "1 hour ago", read: false },
    { id: 3, message: "Welcome to ImageAI!", time: "1 day ago", read: true }
  ])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const lastScrollY = useRef(0)
  const navbarRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const notificationRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 50)
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100)

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false)
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !navbarRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setNotificationOpen(false)
        if (mobileMenuOpen) setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const isActiveLink = (path) => location.pathname === path

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      if (files.length > 0) {
        alert(`Selected ${files.length} file(s) for upload`)
        // Upload logic here
      }
    }
    input.click()
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              <div className="logo-icon-wrapper">
                <span className="logo-icon">🖼️</span>
                <div className="logo-glow"></div>
              </div>
              <span className="logo-text">ImageAI</span>
              <div className="logo-badge">Pro</div>
            </Link>
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActiveLink("/") ? "active" : ""}`}>
                <div className="nav-link-icon">🏠</div>
                <span className="nav-link-text">Home</span>
                <div className="nav-link-indicator"></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActiveLink("/about") ? "active" : ""}`}>
                <div className="nav-link-icon">ℹ️</div>
                <span className="nav-link-text">About</span>
                <div className="nav-link-indicator"></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${isActiveLink("/contact") ? "active" : ""}`}>
                <div className="nav-link-icon">📧</div>
                <span className="nav-link-text">Contact</span>
                <div className="nav-link-indicator"></div>
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <div className="notification-container" ref={notificationRef}>
              <button
                className="action-btn notification-btn"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <div className="btn-icon">🔔</div>
                {unreadCount > 0 && (
                  <div className="notification-badge">{unreadCount}</div>
                )}
                <div className="btn-tooltip">Notifications</div>
              </button>
              {notificationOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button
                      className="mark-all-read"
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                  <div className="notification-footer">
                    <button className="view-all-btn">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="theme-toggle-wrapper">
              <ThemeToggle />
            </div>

            <div className="quick-actions">
              <button className="quick-action-btn upload-btn" onClick={handleUpload}>
                <div className="btn-icon">📤</div>
                <span className="btn-text">Upload</span>
                <div className="btn-glow"></div>
              </button>
            </div>
          </div>

          <div
            className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>

        <div ref={mobileMenuRef} className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-menu">
              <li className="mobile-nav-item">
                <Link to="/" className={`mobile-nav-link ${isActiveLink("/") ? "active" : ""}`}>
                  <div className="mobile-nav-icon">🏠</div>
                  <span>Home</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" className={`mobile-nav-link ${isActiveLink("/about") ? "active" : ""}`}>
                  <div className="mobile-nav-icon">ℹ️</div>
                  <span>About</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" className={`mobile-nav-link ${isActiveLink("/contact") ? "active" : ""}`}>
                  <div className="mobile-nav-icon">📧</div>
                  <span>Contact</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              </li>
            </ul>

            <div className="mobile-nav-actions">
              <div className="mobile-action-grid">
                <button
                  className="mobile-action-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setTimeout(() => setNotificationOpen(true), 300)
                  }}
                >
                  <div className="mobile-action-icon">🔔</div>
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <div className="mobile-notification-badge">{unreadCount}</div>
                  )}
                </button>
                <button
                  className="mobile-action-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setTimeout(handleUpload, 300)
                  }}
                >
                  <div className="mobile-action-icon">📤</div>
                  <span>Upload</span>
                </button>
               
              </div>

              <div className="mobile-theme-toggle">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
   
      {/* Enhanced CSS Styles */}
      <style jsx>{`
        /* Advanced Navigation Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] .navbar {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }

        [data-theme="dark"] .navbar.scrolled {
          background: rgba(15, 23, 42, 0.98);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        /* Enhanced Logo */
        .nav-logo {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #1f2937;
          font-weight: 700;
          font-size: 1.5rem;
          font-family: "Poppins", sans-serif;
          transition: all 0.3s ease;
          position: relative;
          gap: 0.5rem;
        }

        [data-theme="dark"] .logo-link {
          color: #f8fafc;
        }

        .logo-link:hover {
          transform: scale(1.02);
        }

        .logo-icon-wrapper {
          position: relative;
          margin-right: 0.5rem;
        }

        .logo-icon {
          font-size: 2rem;
          position: relative;
          z-index: 2;
          animation: logoFloat 3s ease-in-out infinite;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.3;
          transform: translate(-50%, -50%);
          animation: logoGlow 2s ease-in-out infinite alternate;
        }

        .logo-text {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .logo-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          position: relative;
          top: -8px;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes logoGlow {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Enhanced Desktop Navigation */
        .nav-menu {
          display: flex;
          list-style: none;
          align-items: center;
          gap: 1rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          position: relative;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        [data-theme="dark"] .nav-link {
          color: #e2e8f0;
        }

        .nav-link-icon {
          font-size: 1.1rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .nav-link-text {
          position: relative;
          z-index: 2;
        }

        .nav-link-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 1px;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #eff6ff, #f3e8ff);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        [data-theme="dark"] .nav-link::before {
          background: linear-gradient(135deg, #1e3a8a, #581c87);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover .nav-link-indicator,
        .nav-link.active .nav-link-indicator {
          width: 80%;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #4f46e5;
          transform: translateY(-1px);
        }

        .nav-link:hover .nav-link-icon,
        .nav-link.active .nav-link-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        [data-theme="dark"] .nav-link:hover,
        [data-theme="dark"] .nav-link.active {
          color: #a5b4fc;
        }

        /* Advanced Action Section */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: rgba(79, 70, 229, 0.1);
          transform: translateY(-1px);
        }

        [data-theme="dark"] .action-btn:hover {
          background: rgba(165, 180, 252, 0.1);
        }

        .btn-icon {
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .action-btn:hover .btn-icon {
          transform: scale(1.1);
        }

        .btn-tooltip {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #1f2937;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          white-space: nowrap;
          z-index: 1000;
        }

        [data-theme="dark"] .btn-tooltip {
          background: #f8fafc;
          color: #1f2937;
        }

        .action-btn:hover .btn-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(4px);
        }

        /* Search Container */
        .search-container {
          position: relative;
        }

        .search-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          z-index: 1000;
          overflow: hidden;
        }

        [data-theme="dark"] .search-dropdown {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .search-input-container {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          gap: 0.5rem;
        }

        [data-theme="dark"] .search-input-container {
          border-bottom-color: #334155;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
          color: #1f2937;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }

        [data-theme="dark"] .search-input {
          background: #334155;
          border-color: #475569;
          color: #f8fafc;
        }

        .search-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .search-submit {
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }

        .search-suggestions {
          padding: 0.5rem 0;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4b5563;
        }

        [data-theme="dark"] .suggestion-item {
          color: #e2e8f0;
        }

        .suggestion-item:hover {
          background: #f3f4f6;
          color: #4f46e5;
        }

        [data-theme="dark"] .suggestion-item:hover {
          background: #334155;
          color: #a5b4fc;
        }

        .suggestion-icon {
          font-size: 1.1rem;
        }

        /* Notification Container */
        .notification-container {
          position: relative;
        }

        .notification-btn {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: notificationPulse 2s ease-in-out infinite;
        }

        @keyframes notificationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .notification-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 360px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          z-index: 1000;
          overflow: hidden;
        }

        [data-theme="dark"] .notification-dropdown {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .notification-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        [data-theme="dark"] .notification-header {
          border-bottom-color: #334155;
        }

        .notification-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        [data-theme="dark"] .notification-header h3 {
          color: #f8fafc;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #4f46e5;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mark-all-read:hover {
          color: #4338ca;
          text-decoration: underline;
        }

        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          position: relative;
        }

        [data-theme="dark"] .notification-item {
          border-bottom-color: #334155;
        }

        .notification-item:hover {
          background: #f9fafb;
        }

        [data-theme="dark"] .notification-item:hover {
          background: #334155;
        }

        .notification-item.unread {
          background: #eff6ff;
        }

        [data-theme="dark"] .notification-item.unread {
          background: #1e3a8a;
        }

        .notification-content {
          flex: 1;
        }

        .notification-message {
          color: #1f2937;
          font-size: 0.9rem;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        [data-theme="dark"] .notification-message {
          color: #f8fafc;
        }

        .notification-time {
          color: #6b7280;
          font-size: 0.8rem;
        }

        [data-theme="dark"] .notification-time {
          color: #9ca3af;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          background: #4f46e5;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .notification-footer {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        [data-theme="dark"] .notification-footer {
          border-top-color: #334155;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          color: #4338ca;
          text-decoration: underline;
        }

        .theme-toggle-wrapper {
          display: flex;
          align-items: center;
        }

        /* Quick Actions */
        .quick-actions {
          display: flex;
          align-items: center;
        }

        .quick-action-btn {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .quick-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .quick-action-btn:hover .btn-glow {
          left: 100%;
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
          gap: 4px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          background: rgba(79, 70, 229, 0.1);
        }

        [data-theme="dark"] .mobile-menu-toggle:hover {
          background: rgba(165, 180, 252, 0.1);
        }

        .hamburger-line {
          width: 25px;
          height: 3px;
          background: #4b5563;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] .hamburger-line {
          background: #e2e8f0;
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Enhanced Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] .mobile-menu-overlay {
          background: rgba(15, 23, 42, 0.95);
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Mobile Navigation */
        .mobile-nav-menu {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #f9fafb;
          border: 1px solid #e5e7eb;
        }

        [data-theme="dark"] .mobile-nav-link {
          color: #e2e8f0;
          background: #334155;
          border: 1px solid #475569;
        }

        .mobile-nav-icon {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .mobile-nav-arrow {
          margin-left: auto;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #4f46e5;
          background: #eff6ff;
          border-color: #c7d2fe;
          transform: translateX(8px);
        }

        [data-theme="dark"] .mobile-nav-link:hover,
        [data-theme="dark"] .mobile-nav-link.active {
          color: #a5b4fc;
          background: #1e3a8a;
          border-color: #3730a3;
        }

        .mobile-nav-link:hover .mobile-nav-arrow,
        .mobile-nav-link.active .mobile-nav-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Mobile Actions */
        .mobile-nav-actions {
          margin-top: auto;
        }

        .mobile-action-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .mobile-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        [data-theme="dark"] .mobile-action-btn {
          background: #334155;
          border: 1px solid #475569;
        }

        .mobile-action-btn:hover {
          background: #eff6ff;
          border-color: #c7d2fe;
          transform: translateY(-2px);
        }

        [data-theme="dark"] .mobile-action-btn:hover {
          background: #1e3a8a;
          border-color: #3730a3;
        }

        .mobile-action-icon {
          font-size: 1.5rem;
        }

        .mobile-action-btn span {
          font-size: 0.9rem;
          font-weight: 600;
          color: #4b5563;
        }

        [data-theme="dark"] .mobile-action-btn span {
          color: #e2e8f0;
        }

        .mobile-notification-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-theme-toggle {
          display: flex;
          justify-content: center;
          padding: 1rem 0;
          border-top: 1px solid #e5e7eb;
        }

        [data-theme="dark"] .mobile-theme-toggle {
          border-top: 1px solid #475569;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .nav-menu {
            gap: 0.5rem;
          }

          .nav-actions {
            gap: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .nav-menu,
          .nav-actions {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .nav-container {
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            height: 70px;
          }

          .mobile-menu-overlay {
            top: 70px;
          }

          .logo-link {
            font-size: 1.25rem;
          }

          .logo-icon {
            font-size: 1.5rem;
          }

          .mobile-menu-content {
            padding: 1rem;
          }

          .mobile-action-grid {
            grid-template-columns: 1fr;
          }

          .search-dropdown,
          .notification-dropdown {
            width: 280px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar