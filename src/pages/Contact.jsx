"use client"

import { Github, Twitter, Linkedin, Mail, LockKeyhole } from 'lucide-react';
import { useState, useEffect } from "react"

const Contact = () => {
  const [activeTab, setActiveTab] = useState("contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .slide-in-up")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const faqData = [
    {
      question: "How does the AI image enhancement work?",
      answer:
        "Our AI uses advanced deep learning models trained on millions of images to intelligently enhance your photos. It analyzes each pixel and applies sophisticated algorithms to improve resolution, reduce noise, and enhance details while preserving the natural look of your images.",
    },
    {
      question: "What file formats do you support?",
      answer:
        "We support all major image formats including JPEG, PNG, TIFF, WebP, and RAW files from most camera manufacturers. Our system automatically detects the format and applies the most appropriate enhancement techniques.",
    },
    {
      question: "Is there a limit to image size?",
      answer:
        "Free users can upload images up to 10MB and 4000x4000 pixels. Premium users enjoy unlimited file sizes and can process images up to 16000x16000 pixels for professional-grade results.",
    },
    {
      question: "How long does processing take?",
      answer:
        "Most images are processed within 30-60 seconds depending on size and complexity. Larger images or batch processing may take longer, but we'll keep you updated with real-time progress indicators.",
    },
    {
      question: "Can I use enhanced images commercially?",
      answer:
        "Yes! All enhanced images retain your original copyright and can be used for any purpose including commercial use. We don't claim any rights to your enhanced images.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all premium subscriptions. If you're not satisfied with our service, contact us within 30 days for a full refund.",
    },
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="fade-in">
            <h1 className="page-title">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="page-description">
              Have questions about our AI image enhancement? We're here to help you get the most out of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-container slide-in-up">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button
                className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => setActiveTab("contact")}
              >
                <span className="tab-icon">📧</span>
                Contact Us
              </button>
              <button
                className={`tab-button ${activeTab === "faq" ? "active" : ""}`}
                onClick={() => setActiveTab("faq")}
              >
                <span className="tab-icon">❓</span>
                FAQ
              </button>
              <button
                className={`tab-button ${activeTab === "support" ? "active" : ""}`}
                onClick={() => setActiveTab("support")}
              >
                <span className="tab-icon">🛠️</span>
                Support
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Contact Form Tab */}
              {activeTab === "contact" && (
                <div className="contact-form-section">
                  <div className="form-grid">
                    <div className="form-container">
                      <h2>Send us a Message</h2>
                      <p>Fill out the form below and we'll get back to you within 24 hours.</p>

                      <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Support</option>
                            <option value="billing">Billing Question</option>
                            <option value="feature">Feature Request</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows="6"
                            placeholder="Tell us how we can help you..."
                          ></textarea>
                        </div>

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <span className="spinner"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <span className="button-icon">📤</span>
                            </>
                          )}
                        </button>

                        {submitStatus === "success" && (
                          <div className="status-message success">
                            <span className="status-icon">✅</span>
                            Thank you! Your message has been sent successfully. We'll get back to you soon.
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="status-message error">
                            <span className="status-icon">❌</span>
                            Sorry, there was an error sending your message. Please try again.
                          </div>
                        )}
                      </form>
                    </div>

                    <div className="contact-info">
                      <h3>Other Ways to Reach Us</h3>
                      <div className="info-items">
                        <div className="info-item">
                          <div className="info-icon">📧</div>
                          <div className="info-content">
                            <h4>Email Support</h4>
                            <p>support@imageai.com</p>
                            <span>Response within 24 hours</span>
                          </div>
                        </div>

                        <div className="info-item">
                          <div className="info-icon">💬</div>
                          <div className="info-content">
                            <h4>Live Chat</h4>
                            <p>Available 24/7</p>
                            <button className="chat-button">Start Chat</button>
                          </div>
                        </div>

                        <div className="info-item">
                          <div className="info-icon">📱</div>
                          <div className="info-content">
                            <h4>Phone Support</h4>
                            <p>+1 (555) 123-4567</p>
                            <span>Mon-Fri, 9AM-6PM EST</span>
                          </div>
                        </div>

                        <div className="info-item">
                          <div className="info-icon">🌐</div>
                          <div className="info-content">
                            <h4>Social Media</h4>
                           <h2 class="text-lg font-semibold mb-3">Follow Us</h2>
  <div className="flex space-x-4">
              <a href="https://github.com/subhasmita-puja" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://x.com/subhasmita4602" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/subhasmita-sahoo-puja/" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="subhasmita4602@gmail.com" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="faq-section">
                  <div className="faq-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Find answers to common questions about our AI image enhancement service.</p>
                  </div>

                  <div className="faq-list">
                    {faqData.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <div className="faq-question">
                          <h3>{faq.question}</h3>
                          <span className="faq-icon">+</span>
                        </div>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="faq-footer">
                    <p>Can't find what you're looking for?</p>
                    <button onClick={() => setActiveTab("contact")} className="btn-primary">
                      Contact Support
                    </button>
                  </div>
                </div>
              )}

              {/* Support Tab */}
              {activeTab === "support" && (
                <div className="support-section">
                  <div className="support-header">
                    <h2>Support Resources</h2>
                    <p>Everything you need to get the most out of ImageAI.</p>
                  </div>

                  <div className="support-grid">
                    <div className="support-card">
                      <div className="support-icon">📚</div>
                      <h3>Documentation</h3>
                      <p>Comprehensive guides and tutorials to help you master our platform.</p>
                      <a href="#" className="support-link">
                        View Docs →
                      </a>
                    </div>

                    <div className="support-card">
                      <div className="support-icon">🎥</div>
                      <h3>Video Tutorials</h3>
                      <p>Step-by-step video guides for all features and use cases.</p>
                      <a href="#" className="support-link">
                        Watch Videos →
                      </a>
                    </div>

                    <div className="support-card">
                      <div className="support-icon">🔧</div>
                      <h3>API Reference</h3>
                      <p>Complete API documentation for developers and integrations.</p>
                      <a href="#" className="support-link">
                        API Docs →
                      </a>
                    </div>

                    <div className="support-card">
                      <div className="support-icon">💡</div>
                      <h3>Best Practices</h3>
                      <p>Tips and tricks to get the best results from your image enhancements.</p>
                      <a href="#" className="support-link">
                        Learn More →
                      </a>
                    </div>

                    <div className="support-card">
                      <div className="support-icon">🐛</div>
                      <h3>Bug Reports</h3>
                      <p>Found an issue? Report bugs and track their resolution status.</p>
                      <a href="#" className="support-link">
                        Report Bug →
                      </a>
                    </div>

                    <div className="support-card">
                      <div className="support-icon">💬</div>
                      <h3>Community Forum</h3>
                      <p>Connect with other users, share tips, and get community support.</p>
                      <a href="#" className="support-link">
                        Join Forum →
                      </a>
                    </div>
                  </div>

                  <div className="priority-support">
                    <div className="priority-card">
                      <h3>Need Priority Support?</h3>
                      <p>
                        Upgrade to our Pro plan for priority email support, dedicated account management, and faster
                        response times.
                      </p>
                      <button className="btn-primary">Upgrade to Pro</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Contact Page Styles with Perfect Dark Mode Support */
        .contact-page {
          padding-top: 80px;
          background: var(--bg-primary);
          min-height: 100vh;
          transition: background-color 0.3s ease;
        }

        /* Hero Section */
        .contact-hero {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          padding: 2rem 0;
          text-align: center;
          color: var(--text-inverse);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .page-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800;
          margin-bottom: 0.75rem;
          font-family: "Poppins", sans-serif;
          color: var(--text-inverse);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--accent-300), var(--primary-200));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-description {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.4;
          opacity: 0.95;
          color: var(--text-inverse);
        }

        /* Main Content */
        .contact-content {
          padding: 4rem 0;
          background: var(--bg-primary);
        }

        .contact-container {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          border: 1px solid var(--border-primary);
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
        }

        .tab-button {
          flex: 1;
          padding: 1.5rem 2rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
        }

        .tab-button:hover:not(.active) {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .tab-button.active {
          background: var(--bg-card);
          color: var(--primary-600);
          border-bottom: 3px solid var(--primary-600);
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        /* Tab Content */
        .tab-content {
          padding: 3rem;
        }

        /* Contact Form Section */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 1024px) {
          .form-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .form-container h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-family: "Poppins", sans-serif;
        }

        .form-container p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid var(--border-primary);
          border-radius: 12px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-muted);
        }

        .submit-button {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          color: var(--text-inverse);
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .status-message {
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          margin-top: 1rem;
        }

        .status-message.success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-600);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-message.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        /* Contact Info */
        .contact-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .info-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .info-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .info-content h4 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .info-content p {
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .info-content span {
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .chat-button {
          background: var(--primary-600);
          color: var(--text-inverse);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .chat-button:hover {
          background: var(--primary-700);
          transform: translateY(-1px);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .social-link {
          color: var(--primary-600);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--primary-700);
          text-decoration: underline;
        }

        /* FAQ Section */
        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-family: "Poppins", sans-serif;
        }

        .faq-header p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .faq-item {
          background: var(--bg-secondary);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: var(--shadow-lg);
        }

        .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: var(--bg-tertiary);
        }

        .faq-question h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .faq-icon {
          font-size: 1.5rem;
          color: var(--primary-600);
          font-weight: bold;
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          border-top: 1px solid var(--border-primary);
        }

        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .faq-footer {
          text-align: center;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border-primary);
        }

        .faq-footer p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        /* Support Section */
        .support-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .support-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-family: "Poppins", sans-serif;
        }

        .support-header p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .support-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .support-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .support-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .support-card {
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid var(--border-primary);
        }

        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .support-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .support-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .support-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .support-link {
          color: var(--primary-600);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .support-link:hover {
          color: var(--primary-700);
          text-decoration: underline;
        }

        .priority-support {
          margin-top: 3rem;
        }

        .priority-card {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          padding: 3rem;
          border-radius: 24px;
          text-align: center;
          color: var(--text-inverse);
        }

        .priority-card h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-inverse);
        }

        .priority-card p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.95;
          color: var(--text-inverse);
        }

        .btn-primary {
          background: rgba(255, 255, 255, 0.2);
          color: var(--text-inverse);
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Animation Classes */
        .fade-in,
        .slide-in-left,
        .slide-in-right,
        .slide-in-up {
          opacity: 0;
          transition: all 0.8s ease;
        }

        .slide-in-left {
          transform: translateX(-50px);
        }

        .slide-in-right {
          transform: translateX(50px);
        }

        .slide-in-up {
          transform: translateY(50px);
        }

        .fade-in.visible,
        .slide-in-left.visible,
        .slide-in-right.visible,
        .slide-in-up.visible {
          opacity: 1;
          transform: translate(0);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .tab-content {
            padding: 2rem;
          }

          .tab-button {
            padding: 1rem;
            font-size: 0.9rem;
          }

          .tab-icon {
            display: none;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .info-item {
            padding: 1rem;
          }

          .priority-card {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .contact-hero {
            padding: 2rem 0;
          }

          .contact-content {
            padding: 3rem 0;
          }

          .tab-content {
            padding: 1.5rem;
          }

          .support-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Contact
