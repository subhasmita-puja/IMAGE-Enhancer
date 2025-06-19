import { useState, useEffect, useRef } from 'react'

const ImagePreview = ({ uploadedImage, enhancedImage, loading }) => {
  const [activeTab, setActiveTab] = useState('before')
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDownloading, setIsDownloading] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const comparisonRef = useRef(null)

  useEffect(() => {
    if (enhancedImage) {
      setActiveTab('compare')
    }
  }, [enhancedImage])

  useEffect(() => {
    if (uploadedImage && activeTab === 'compare') {
      const img = new Image()
      img.onload = () => {
        const containerWidth = comparisonRef.current?.offsetWidth || 800
        const aspectRatio = img.height / img.width
        const calculatedHeight = Math.min(containerWidth * aspectRatio, 600)
        
        setImageDimensions({
          width: containerWidth,
          height: calculatedHeight
        })
      }
      img.src = uploadedImage
    }
  }, [uploadedImage, activeTab])

  if (!uploadedImage && !loading) {
    return null
  }

  const downloadImage = async () => {
    if (!enhancedImage) return
    
    setIsDownloading(true)
    try {
      const response = await fetch(enhancedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `enhanced-image-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const viewFullImage = () => {
    if (enhancedImage) {
      window.open(enhancedImage, '_blank')
    }
  }

  const resetUpload = () => {
    window.location.reload()
  }

  return (
    <div className="image-preview-container">
      <div className="preview-header">
        <h3>Image Enhancement Result</h3>
        {enhancedImage && (
          <div className="header-actions">
            <button onClick={viewFullImage} className="view-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View Full
            </button>
            <button onClick={downloadImage} className="download-btn" disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <div className="spinner-small"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="preview-tabs">
        <button 
          className={`tab-btn ${activeTab === 'before' ? 'active' : ''}`}
          onClick={() => setActiveTab('before')}
        >
          Original
        </button>
        <button 
          className={`tab-btn ${activeTab === 'after' ? 'active' : ''} ${!enhancedImage && !loading ? 'disabled' : ''}`}
          onClick={() => setActiveTab('after')}
          disabled={!enhancedImage && !loading}
        >
          Enhanced
        </button>
        <button 
          className={`tab-btn ${activeTab === 'compare' ? 'active' : ''} ${!enhancedImage ? 'disabled' : ''}`}
          onClick={() => setActiveTab('compare')}
          disabled={!enhancedImage}
        >
          Compare
        </button>
      </div>

      <div className="preview-content">
        {activeTab === 'before' && uploadedImage && (
          <div className="image-container">
            <img src={uploadedImage} alt="Original" className="preview-image" />
            <div className="image-label">Original</div>
          </div>
        )}

        {activeTab === 'after' && (
          <div className="image-container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Enhancing your image...</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            ) : enhancedImage ? (
              <>
                <img src={enhancedImage} alt="Enhanced" className="preview-image" />
                <div className="image-label enhanced">Enhanced</div>
              </>
            ) : (
              <div className="placeholder">
                <p>Enhanced image will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && enhancedImage && (
          <div className="comparison-container" ref={comparisonRef}>
            <div className="comparison-slider" style={{ height: `${imageDimensions.height || 500}px` }}>
              <div className="comparison-wrapper">
                <div 
                  className="comparison-before" 
                  style={{ 
                    backgroundImage: `url(${uploadedImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div
                  className="comparison-after"
                  style={{
                    backgroundImage: `url(${enhancedImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: `${sliderPosition}%`,
                  }}
                ></div>
                <div className="slider-line" style={{ left: `${sliderPosition}%` }}>
                  <div className="slider-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8L22 12L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 8L2 12L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(e.target.value)}
                className="slider-input"
              />
            </div>
            <div className="comparison-labels">
              <span>Original</span>
              <span>Enhanced</span>
            </div>
            <div className="comparison-instructions">
              <p>Drag the slider to compare before and after</p>
            </div>
          </div>
        )}
      </div>

      {enhancedImage && (
        <div className="action-buttons">
          <button onClick={downloadImage} className="action-btn primary" disabled={isDownloading}>
            {isDownloading ? (
              <>
                <div className="spinner-small"></div>
                Downloading...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Enhanced Image
              </>
            )}
          </button>
          <button onClick={viewFullImage} className="action-btn secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Full Size
          </button>
          <button onClick={resetUpload} className="action-btn tertiary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="1,4 1,10 7,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Enhance Another
          </button>
        </div>
      )}

      <style jsx>{`
        .image-preview-container {
          margin-top: 3rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .preview-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .view-btn, .download-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 0.875rem;
        }

        .view-btn {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .view-btn:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .download-btn {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
        }

        .download-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .preview-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: #f8fafc;
          padding: 0.5rem;
          border-radius: 12px;
        }

        .tab-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover:not(.disabled) {
          color: #4f46e5;
          background: rgba(79, 70, 229, 0.1);
        }

        .tab-btn.active {
          background: white;
          color: #4f46e5;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .tab-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .preview-content {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .image-container {
          position: relative;
          max-width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .preview-image {
          width: 100%;
          height: auto;
          max-height: 500px;
          object-fit: contain;
          display: block;
        }

        .image-label {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .image-label.enhanced {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 3rem;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #4f46e5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-container p {
          color: #64748b;
          font-weight: 500;
          margin: 0;
        }

        .progress-bar {
          width: 200px;
          height: 4px;
          background: #f1f5f9;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          border-radius: 2px;
          animation: progress 3s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .placeholder {
          padding: 3rem;
          text-align: center;
          color: #9ca3af;
          border: 2px dashed #e5e7eb;
          border-radius: 16px;
        }

        .comparison-container {
          width: 100%;
          max-width: 100%;
        }

        .comparison-slider {
          position: relative;
          width: 100%;
          min-height: 400px;
          margin-bottom: 1rem;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .comparison-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: #f8fafc;
        }

        .comparison-before,
        .comparison-after {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .comparison-before {
          width: 100%;
          background-color: #f8fafc;
        }

        .comparison-after {
          width: 50%;
          border-right: 4px solid white;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
          background-color: #f8fafc;
        }

        .slider-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background: white;
          cursor: ew-resize;
          z-index: 10;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .slider-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          cursor: ew-resize;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4f46e5;
          transition: all 0.3s ease;
        }

        .slider-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
        }

        .slider-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: ew-resize;
          z-index: 15;
        }

        .comparison-labels {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.5rem;
          padding: 0 0.5rem;
        }

        .comparison-instructions {
          text-align: center;
          margin-bottom: 1rem;
        }

        .comparison-instructions p {
          color: #9ca3af;
          font-size: 0.875rem;
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 0.9rem;
          min-width: 160px;
          justify-content: center;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
        }

        .action-btn.primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }

        .action-btn.secondary {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .action-btn.secondary:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .action-btn.tertiary {
          background: transparent;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .action-btn.tertiary:hover {
          background: #f8fafc;
          color: #475569;
        }

        .action-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .image-preview-container {
            padding: 1.5rem;
            margin-top: 2rem;
          }

          .preview-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            justify-content: center;
          }

          .comparison-slider {
            min-height: 300px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-btn {
            min-width: auto;
          }

          .preview-content {
            min-height: 300px;
          }

          .preview-image {
            max-height: 300px;
          }

          .slider-button {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .tab-btn {
            padding: 0.5rem;
            font-size: 0.875rem;
          }

          .action-btn {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }

          .comparison-slider {
            min-height: 250px;
          }

          .slider-button {
            width: 36px;
            height: 36px;
          }
        }

        /* Dark mode support */
        [data-theme="dark"] .image-preview-container {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .preview-header h3 {
          color: #f8fafc;
        }

        [data-theme="dark"] .preview-tabs {
          background: #334155;
        }

        [data-theme="dark"] .tab-btn {
          color: #cbd5e1;
        }

        [data-theme="dark"] .tab-btn.active {
          background: #475569;
          color: #a5b4fc;
        }

        [data-theme="dark"] .comparison-wrapper,
        [data-theme="dark"] .comparison-before,
        [data-theme="dark"] .comparison-after {
          background-color: #1e293b;
        }

        [data-theme="dark"] .comparison-labels {
          color: #cbd5e1;
        }

        [data-theme="dark"] .comparison-instructions p {
          color: #64748b;
        }
      `}</style>
    </div>
  )
}

export default ImagePreview