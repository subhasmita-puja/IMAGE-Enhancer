"use client"

import { useEffect } from "react"

const About = () => {
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

          // Counter animation
          if (entry.target.classList.contains("counter")) {
            const target = Number.parseInt(entry.target.getAttribute("data-target"))
            const duration = 2000
            const increment = target / (duration / 16)
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              entry.target.textContent = Math.floor(current).toLocaleString()
            }, 16)
          }
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .counter",
    )
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="fade-in">
            <h1 className="page-title">
              About <span className="text-gradient">ImageAI</span>
            </h1>
            <p className="page-description">
              We're on a mission to make professional image enhancement accessible to everyone through the power of
              artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-card slide-in-left">
              <div className="card-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                To democratize professional-quality image enhancement through AI technology, making it accessible to
                creators, businesses, and individuals worldwide. We believe everyone deserves access to powerful tools
                that bring their visual content to life.
              </p>
            </div>
            <div className="content-card slide-in-right">
              <div className="card-icon">🚀</div>
              <h2>Our Vision</h2>
              <p>
                To become the world's leading platform for AI-powered image enhancement, continuously pushing the
                boundaries of what's possible in image processing while maintaining simplicity and accessibility for all
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase Section */}
      <section className="technology-section">
        <div className="container">
          <div className="fade-in text-center mb-16">
            <h2 className="section-title">
              Our <span className="text-gradient">Technology</span>
            </h2>
            <p className="section-description">
              Powered by cutting-edge AI models and advanced machine learning algorithms for superior image enhancement.
            </p>
          </div>

          <div className="technology-showcase">
            <div className="tech-demo slide-in-left">
              <div className="demo-container">
                <div className="demo-image">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/da939a180757607.65107639035ed.jpg"
                    alt="AI Technology Demo - Portrait Enhancement"
                    className="tech-demo-image"
                  />
                  <div className="demo-overlay">
                    <div className="demo-label">Neural Network Processing</div>
                  </div>
                </div>
                <div className="demo-description">
                  <h3>Advanced AI Models</h3>
                  <p>Our proprietary neural networks analyze and enhance every pixel with precision.</p>
                </div>
              </div>
            </div>

            <div className="tech-features slide-in-right">
              <div className="feature-list">
                <div className="tech-feature">
                  <div className="feature-icon">🧠</div>
                  <div className="feature-content">
                    <h4>Deep Learning</h4>
                    <p>Advanced neural networks trained on millions of images</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-content">
                    <h4>GPU Acceleration</h4>
                    <p>Lightning-fast processing with optimized GPU computing</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <div className="feature-icon">🎨</div>
                  <div className="feature-content">
                    <h4>Smart Enhancement</h4>
                    <p>Intelligent algorithms that preserve artistic intent</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <div className="feature-icon">🔬</div>
                  <div className="feature-content">
                    <h4>Research-Backed</h4>
                    <p>Based on latest computer vision research and innovations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Examples Section */}
      <section className="examples-section">
        <div className="container">
          <div className="fade-in text-center mb-16">
            <h2 className="section-title">
              See the <span className="text-gradient">Difference</span>
            </h2>
            <p className="section-description">Real examples showcasing the power of our AI enhancement technology.</p>
          </div>

          <div className="examples-grid">
            <div className="example-item slide-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="example-container">
                <div className="example-image-wrapper">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Portrait%20Enhancement%20about-TodM7w7nETBH8ikzACxlWTgbVzHjH8.jpeg"
                    alt="Portrait Enhancement Before and After"
                    className="example-image"
                  />
                  <div className="example-overlay">
                    <div className="overlay-labels">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Portrait Enhancement</h3>
                  <p>Enhanced facial details and skin texture while maintaining natural appearance</p>
                </div>
              </div>
            </div>

            <div className="example-item slide-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="example-container">
                <div className="example-image-wrapper">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Landscape%20Upscaling%20about.jpg-qwVy2OHPsQg3HiRaoOztktPx8BDIvw.jpeg"
                    alt="Landscape Enhancement Before and After"
                    className="example-image"
                  />
                  <div className="example-overlay">
                    <div className="overlay-labels">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Landscape Upscaling</h3>
                  <p>Increased resolution and clarity while preserving natural colors and textures</p>
                </div>
              </div>
            </div>

            <div className="example-item slide-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="example-container">
                <div className="example-image-wrapper">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Old%20Photo%20Restoration%20about.jpg-gI3CPQ5mM6jNyohRJGXcm65iqxg9yf.jpeg"
                    alt="Photo Restoration Before and After"
                    className="example-image"
                  />
                  <div className="example-overlay">
                    <div className="overlay-labels">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Old Photo Restoration</h3>
                  <p>Restored vintage photos with improved colors and reduced noise artifacts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in">
            <div className="cta-card">
              <h3>Ready to Experience the Future of Image Enhancement?</h3>
              <p>Join thousands of creators who trust ImageAI for their image enhancement needs.</p>
              <div className="cta-buttons">
                <button onClick={() => (window.location.href = "/")} className="btn-primary">
                  Start Enhancing Now
                </button>
                <button onClick={() => (window.location.href = "/contact")} className="btn-secondary">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* About Page Styles with Perfect Dark Mode Support */
        .about-page {
          padding-top: 80px;
          background: var(--bg-primary);
          min-height: 100vh;
          transition: background-color 0.3s ease;
        }

        /* Hero Section */
        .about-hero {
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
          margin-bottom: 0.5rem;
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
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.4;
          opacity: 0.95;
          color: var(--text-inverse);
        }

        /* Mission & Vision Section */
        .mission-vision-section {
          padding: 6rem 0;
          background: var(--bg-primary);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .content-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s ease;
          border: 1px solid var(--border-primary);
        }

        .content-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
        }

        .content-card h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-family: "Poppins", sans-serif;
        }

        .content-card p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        /* Technology Section */
        .technology-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
        }

        .section-title {
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-primary);
          font-family: "Poppins", sans-serif;
        }

        .section-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .technology-showcase {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          margin-top: 4rem;
        }

        @media (min-width: 1024px) {
          .technology-showcase {
            grid-template-columns: 1fr 1fr;
          }
        }

        .tech-demo {
          position: relative;
        }

        .demo-container {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-primary);
        }

        .demo-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .tech-demo-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .demo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 2rem;
          color: white;
        }

        .demo-label {
          font-weight: 600;
          font-size: 1.125rem;
        }

        .demo-description h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .demo-description p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .tech-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tech-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-card);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
          border: 1px solid var(--border-primary);
        }

        .tech-feature:hover {
          transform: translateX(10px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .feature-content h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .feature-content p {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Examples Section */
        .examples-section {
          padding: 6rem 0;
          background: var(--bg-primary);
        }

        .examples-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-top: 4rem;
        }

        @media (min-width: 768px) {
          .examples-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .examples-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .example-item {
          position: relative;
        }

        .example-container {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 1rem;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s ease;
          border: 1px solid var(--border-primary);
        }

        .example-container:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }

        .example-image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .example-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .example-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, transparent 45%, rgba(0, 0, 0, 0.1) 50%, transparent 55%, transparent 100%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .overlay-labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .before-label,
        .after-label {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .example-description h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .example-description p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Team Section */
        .team-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
        }

        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-top: 4rem;
        }

        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .team-member {
          text-align: center;
        }

        .member-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 3rem 2rem;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s ease;
          border: 1px solid var(--border-primary);
        }

        .member-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }

        .member-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 2rem;
          box-shadow: var(--shadow-lg);
        }

        .member-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .member-role {
          color: var(--primary-600);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .member-bio {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 0;
          background: var(--bg-primary);
        }

        .cta-card {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          border-radius: 32px;
          padding: 4rem 3rem;
          text-align: center;
          color: var(--text-inverse);
          box-shadow: var(--shadow-2xl);
        }

        .cta-card h3 {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-inverse);
        }

        .cta-card p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.95;
          color: var(--text-inverse);
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        @media (min-width: 640px) {
          .cta-buttons {
            flex-direction: row;
            justify-content: center;
          }
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: rgba(255, 255, 255, 0.2);
          color: var(--text-inverse);
          backdrop-filter: blur(10px);
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-inverse);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
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

          .content-card,
          .demo-container,
          .member-card {
            padding: 2rem;
          }

          .cta-card {
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero {
            padding: 1.5rem 0;
          }

          .mission-vision-section,
          .technology-section,
          .examples-section,
          .team-section,
          .cta-section {
            padding: 4rem 0;
          }

          .content-card,
          .demo-container,
          .member-card {
            padding: 1.5rem;
          }

          .cta-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default About
