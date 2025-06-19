"use client"

import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Social media links
  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "https://x.com/subhasmita4602" },
    { name: "Instagram", icon: "📷", url: "https://www.instagram.com/__subhasmita__sahoo___/" },
    { name: "GitHub", icon: "🐙", url: "https://github.com/subhasmita-puja" },
    { name: "Linkedin", icon: "💬", url: "https://www.linkedin.com/in/subhasmita-sahoo-puja/" },
  ]

  // Quick links
  const quickLinks = [
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  
  ]

  return (
    <>
      <footer className="compact-footer">
        <div className="footer-container">
          {/* Main Footer Content */}
          <div className="footer-content">
            {/* Logo and Description */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🖼️</span>
                <span className="logo-text">ImageAI</span>
              </div>
              <p className="footer-description">
                Enhance your images with AI-powered technology. Fast, secure, and easy to use.
              </p>
            </div>

            {/* Newsletter */}
            <div className="newsletter-section">
              <h3 className="newsletter-title">Stay Updated</h3>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" disabled={isSubscribed}>
                  {isSubscribed ? "✓" : "→"}
                </button>
              </form>
              {isSubscribed && <p className="success-message">Thanks for subscribing! 🎉</p>}
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-link"
                    title={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="quick-link"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="copyright">© {currentYear} ImageAI. All rights reserved. Made with ❤️ for creators.</p>
            <button className="back-to-top" onClick={scrollToTop} title="Back to top">
              ↑
            </button>
          </div>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
  .compact-footer {
    background: var(--bg-secondary);
    color: var(--text-primary);
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border-primary);
  }

  .compact-footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-500), transparent);
  }

  .footer-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem 1.5rem;
    text-align: center;
  }

  /* Main Footer Content */
  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }

  /* Brand Section */
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    font-size: 2rem;
    animation: bounce 2s infinite;
    filter: brightness(1.2);
  }

  /* Enhanced logo text with better dark mode visibility */
  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: "Poppins", sans-serif;
    background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }

  /* Dark mode specific logo enhancement */
  [data-theme="dark"] .logo-text {
    background: linear-gradient(135deg, var(--primary-400), var(--secondary-400));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: brightness(1.3);
    text-shadow: 0 0 30px rgba(147, 197, 253, 0.5);
  }

  .footer-description {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 250px;
  }

  /* Newsletter Section */
  .newsletter-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .newsletter-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
  }

  .newsletter-form {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 280px;
  }

  .newsletter-input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid var(--border-primary);
    border-radius: 8px;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .newsletter-input::placeholder {
    color: var(--text-muted);
  }

  .newsletter-input:focus {
    outline: none;
    border-color: var(--primary-500);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .newsletter-btn {
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
    color: var(--text-inverse);
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 50px;
  }

  .newsletter-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }

  .newsletter-btn:disabled {
    background: var(--accent-500);
  }

  .success-message {
    color: var(--accent-400);
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0;
  }

  /* Social Section */
  .social-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .social-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    filter: brightness(1.1);
  }

  .social-link:hover {
    background: var(--primary-600);
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  /* Dark mode social links enhancement */
  [data-theme="dark"] .social-link {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-secondary);
    filter: brightness(1.3);
  }

  [data-theme="dark"] .social-link:hover {
    background: var(--primary-500);
    box-shadow: 0 4px 15px rgba(147, 197, 253, 0.4);
  }

  /* Quick Links */
  .quick-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .quick-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
  }

  .quick-link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--primary-400);
    transition: width 0.3s ease;
  }

  .quick-link:hover {
    color: var(--primary-400);
  }

  .quick-link:hover::after {
    width: 100%;
  }

  /* Footer Bottom */
  .footer-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-primary);
    flex-wrap: wrap;
  }

  .copyright {
    color: var(--text-tertiary);
    font-size: 0.85rem;
    margin: 0;
  }

  .back-to-top {
    background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
    color: var(--text-inverse);
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }

  .back-to-top:hover {
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }

  /* Dark mode back to top enhancement */
  [data-theme="dark"] .back-to-top {
    box-shadow: 0 2px 8px rgba(147, 197, 253, 0.3);
  }

  [data-theme="dark"] .back-to-top:hover {
    box-shadow: 0 4px 15px rgba(147, 197, 253, 0.5);
  }

  /* Animations */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-3px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .footer-container {
      padding: 2rem 1rem 1rem;
    }

    .footer-content {
      gap: 2rem;
    }

    .quick-links {
      gap: 1.5rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    .footer-container {
      padding: 1.5rem 1rem 1rem;
    }

    .logo-text {
      font-size: 1.25rem;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .quick-links {
      gap: 1rem;
    }

    .quick-link {
      font-size: 0.85rem;
    }
  }

  /* Enhanced dark mode visibility fixes */
  [data-theme="dark"] .footer-description {
    color: var(--text-secondary);
    filter: brightness(1.1);
  }

  [data-theme="dark"] .newsletter-title,
  [data-theme="dark"] .social-title {
    color: var(--text-primary);
    filter: brightness(1.1);
  }

  [data-theme="dark"] .copyright {
    color: var(--text-tertiary);
    filter: brightness(1.2);
  }

  [data-theme="dark"] .quick-link {
    color: var(--text-secondary);
    filter: brightness(1.1);
  }

  [data-theme="dark"] .quick-link:hover {
    color: var(--primary-400);
    filter: brightness(1.3);
  }
`}</style>
    </>
  )
}

export default Footer