import { useState, useEffect } from "react"
import ImageUpload from "../components/ImageUpload"
import ImagePreview from "../components/ImagePreview"
import { enhanceImageAPI } from "../utils/enhanceImageApi"
import "../styles/home.css"

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [enhancedImage, setEnhancedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

  const handleImageUpload = async (file) => {
    try {
      // Create preview URL for uploaded image
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      setEnhancedImage(null)
      setError(null)
      setLoading(true)

      console.log("Starting image enhancement...")
      
      // Call the API to enhance the image
      const result = await enhanceImageAPI(file)
      
      console.log("Enhancement result:", result)
      
       // Check if we have a valid result with enhanced image URL
      if (result && result.enhancedImageUrl) {
        setEnhancedImage(result.enhancedImageUrl)
        console.log("Enhanced image URL:", result.enhancedImageUrl)
      } else if (result && result.output && result.output.length > 0) {
        // Alternative response format - direct output array
        setEnhancedImage(result.output[0])
        console.log("Enhanced image URL (alt format):", result.output[0])
      } else {
        throw new Error("No enhanced image URL received from API")
      }
    } catch (error) {
      console.error("Enhancement failed:", error)
      setError(error.message || "Failed to enhance image. Please try again.")
      
      // Show user-friendly error message
      alert(`Enhancement failed: ${error.message || "Please try again with a different image."}`)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      {/* Enhanced Compact Hero Section */}
      <section id="home" className="hero-section-compact">
        {/* Advanced Background Layers */}
        <div className="hero-bg-layer-1"></div>
        <div className="hero-bg-layer-2"></div>
        <div className="hero-bg-layer-3"></div>

        {/* Animated Mesh Gradient */}
        <div className="hero-mesh-gradient"></div>

        {/* Floating Orbs - Smaller */}
        <div className="hero-orbs">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>

        {/* Main Content Container */}
        <div className="hero-content-container">
          <div className="max-w-7xl mx-auto px-4">
            {/* Two Column Layout */}
            <div className="hero-grid">
              {/* Left Column - Text Content */}
              <div className="hero-text-column">
                {/* Hero Badge */}
                <div className="hero-badge-compact fade-in slide-in-left">
                  <span className="hero-badge-icon">✨</span>
                  <span>AI-Powered Enhancement</span>
                  <div className="hero-badge-glow"></div>
                </div>

                {/* Main Title */}
                <div className="hero-title-compact fade-in slide-in-left">
                  <h1 className="hero-title-text">
                    Transform Your Images with <span className="hero-title-gradient">AI Magic</span>
                  </h1>
                </div>

                {/* Description */}
                <div className="hero-description fade-in slide-in-left">
                  <p className="hero-description-text">
                    Enhance image quality, resolution, and clarity in seconds using our advanced machine learning
                    algorithms.
                  </p>
                  <p className="hero-description-highlight">
                    Upload any image and watch it transform before your eyes.
                  </p>
                </div>

                {/* Features List */}
                <div className="hero-features fade-in slide-in-left">
                  <div className="hero-feature">
                    <div className="hero-feature-icon">⚡</div>
                    <span>Lightning fast processing</span>
                  </div>
                  <div className="hero-feature">
                    <div className="hero-feature-icon">🎯</div>
                    <span>Professional quality results</span>
                  </div>
                  <div className="hero-feature">
                    <div className="hero-feature-icon">🔒</div>
                    <span>100% secure and private</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Upload Section */}
              <div className="hero-upload-column">
                <div className="hero-upload-card fade-in slide-in-right">
                  {/* Upload Card Header */}
                  <div className="upload-card-header">
                    <div className="upload-header-icon-enhanced">
                      <div className="header-icon-bg"></div>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="14,2 14,8 20,8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="16"
                          y1="13"
                          x2="8"
                          y2="13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="12"
                          y1="17"
                          x2="12"
                          y2="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="9,12 12,9 15,12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="upload-card-title">Start Enhancing</h3>
                    <p className="upload-card-subtitle">Drop your image and see the magic happen</p>
                  </div>

                  {/* Enhanced Upload Area */}
                  <div className="upload-card-content">
                    <div className="hero-upload-wrapper">
                      <ImageUpload onImageUpload={handleImageUpload} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="upload-card-stats">
                    <div className="upload-stat">
                      <div className="upload-stat-number">2M+</div>
                      <div className="upload-stat-label">Enhanced</div>
                    </div>
                    <div className="upload-stat-divider"></div>
                    <div className="upload-stat">
                      <div className="upload-stat-number">99.9%</div>
                      <div className="upload-stat-label">Accuracy</div>
                    </div>
                    <div className="upload-stat-divider"></div>
                    <div className="upload-stat">
                      <div className="upload-stat-number">&lt; 5s</div>
                      <div className="upload-stat-label">Speed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section - Full Width */}
            <div className="hero-preview-section">
              <ImagePreview 
                uploadedImage={uploadedImage} 
                enhancedImage={enhancedImage} 
                loading={loading} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Examples Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See the <span className="text-gradient">Magic</span> in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Witness the incredible transformation power of our AI technology with these real examples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example 1 - Portrait Enhancement */}
            <div className="transformation-example slide-in-left">
              <div className="example-container">
                <div className="single-image-container">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Portrait%20Enhancement-uWK1VqljJd42WfOC2UHb2RmiDOZM2p.jpeg"
                    alt="Portrait Enhancement Example"
                    className="transformation-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Portrait Enhancement</h3>
                  <p>Improved skin texture and facial details while maintaining natural appearance</p>
                </div>
              </div>
            </div>

            {/* Example 2 - Landscape Upscaling */}
            <div className="transformation-example slide-in-up">
              <div className="example-container">
                <div className="single-image-container">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Landscape%20Upscaling.jpg-OXCbU8dmB1ToHYTMQ7AryN42tF2fCI.jpeg"
                    alt="Landscape Enhancement Example"
                    className="transformation-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Landscape Upscaling</h3>
                  <p>Enhanced resolution and clarity with improved color vibrancy</p>
                </div>
              </div>
            </div>

            {/* Example 3 - Old Photo Restoration */}
            <div className="transformation-example slide-in-right">
              <div className="example-container">
                <div className="single-image-container">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Old%20Photo%20Restoration-41P5kwSGmsgTGVzeDrcC5OcgdZ20We.webp"
                    alt="Photo Restoration Example"
                    className="transformation-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="before-label">Before</span>
                      <span className="after-label">After</span>
                    </div>
                  </div>
                </div>
                <div className="example-description">
                  <h3>Old Photo Restoration</h3>
                  <p>Restored colors and removed noise from vintage photographs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-gradient">ImageEnhancer</span>?
          </h2>
          <p className="text-md text-gray-600 mb-10 max-w-2xl mx-auto">
            Our cutting-edge AI delivers professional results instantly. Here's why creators trust us.
          </p>

          <div className="feature-grid">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                desc: "Process images in seconds using optimized AI algorithms. No delays, only speed.",
              },
              {
                icon: "🎯",
                title: "High Quality",
                desc: "Get professional-level enhancement with detail preservation. No watermarks.",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Images are never stored. Enjoy total privacy and protection.",
              },
            ].map((item, i) => (
              <div className="feature-card-compact fade-in" key={i}>
                <div className="icon-badge">{item.icon}</div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Trusted by Millions & How It Works Section */}
      <section className="trusted-how-wrapper">
        <div className="trusted-how-container">
          {/* LEFT - Trusted by Millions */}
          <div className="trusted-box group fade-in slide-in-left">
            {/* Glow Effect */}
            <div className="trusted-glow"></div>

            {/* Floating Particles */}
            <div className="floating-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
            </div>

            <div className="trusted-content">
              <div className="trusted-header">
                <h2 className="trusted-title">
                  Trusted by <span className="text-gradient-animated">Millions</span>
                </h2>
                <p className="trusted-subtitle">
                  Join creators and businesses who rely on our AI image enhancement technology.
                </p>
              </div>

              <div className="trusted-stats">
                {[
                  { value: 1000000, label: "Images Enhanced", icon: "🖼️", color: "blue" },
                  { value: 50000, label: "Happy Users", icon: "👥", color: "purple" },
                  { value: 99, label: "Uptime %", icon: "⚡", color: "green" },
                  { value: 24, label: "Countries", icon: "🌍", color: "orange" },
                ].map((item, i) => (
                  <div key={i} className={`trusted-stat stat-${item.color}`}>
                    <div className="stat-icon">{item.icon}</div>
                    <div className="counter stat-value" data-target={item.value}>
                      0
                    </div>
                    <div className="stat-label">{item.label}</div>
                    <div className="stat-glow"></div>
                  </div>
                ))}
              </div>

              <div className="trust-badges">
                <div className="trust-badge">
                  <span className="badge-icon">✓</span>
                  <span>SOC 2</span>
                </div>
                <div className="trust-badge">
                  <span className="badge-icon">🔒</span>
                  <span>GDPR</span>
                </div>
                <div className="trust-badge">
                  <span className="badge-icon">⭐</span>
                  <span>4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - How It Works */}
          <div className="how-box group fade-in slide-in-right">
            {/* Glow Effect */}
            <div className="how-glow"></div>

            <div className="how-content">
              <div className="how-header">
                <h2 className="trusted-title">
                  How It <span className="text-gradient-animated">Works</span>
                </h2>
                <p className="trusted-subtitle">We process your image using advanced AI in just 4 simple steps.</p>
              </div>

              <div className="how-steps">
                {[
                  { icon: "📤", title: "Upload", desc: "Securely upload your image", color: "blue" },
                  { icon: "🔍", title: "Analyze", desc: "AI evaluates image quality", color: "purple" },
                  { icon: "✨", title: "Enhance", desc: "Clarity and detail improved", color: "pink" },
                  { icon: "⬇️", title: "Download", desc: "Get your enhanced image", color: "green" },
                ].map((step, i) => (
                  <div key={i} className={`how-step step-${step.color}`}>
                    <div className="step-number">{String(i + 1).padStart(2, "0")}</div>
                    <div className="step-icon-container">
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-pulse"></div>
                    </div>
                    <div className="step-content">
                      <div className="step-title">{step.title}</div>
                      <div className="step-desc">{step.desc}</div>
                    </div>
                    <div className="step-connector"></div>
                  </div>
                ))}
              </div>

              <div className="how-cta">
                <button className="try-now-btn">
                  <span>Try It Now - Free</span>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home