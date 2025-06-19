import { useState, useRef } from 'react'

const ImageUpload = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    setIsUploading(true)
    
    try {
      await onImageUpload(file)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="image-upload-container">
      <div
        className={`upload-area ${isDragOver ? 'drag-over' : ''} ${isUploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div className="upload-content">
          {isUploading ? (
            <div className="uploading-state">
              <div className="spinner"></div>
              <p>Processing your image...</p>
            </div>
          ) : (
            <>
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    x1="12"
                    y1="18"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="9,15 12,12 15,15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Drop your image here</h3>
              <p>or click to browse files</p>
              <div className="file-info">
                <span>Supports: JPG, PNG, WebP</span>
                <span>Max size: 10MB</span>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .image-upload-container {
          width: 100%;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 16px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f9fafb;
          position: relative;
          overflow: hidden;
        }

        .upload-area:hover {
          border-color: #4f46e5;
          background: #f0f9ff;
          transform: translateY(-2px);
        }

        .upload-area.drag-over {
          border-color: #4f46e5;
          background: #eff6ff;
          transform: scale(1.02);
        }

        .upload-area.uploading {
          border-color: #10b981;
          background: #ecfdf5;
          cursor: not-allowed;
        }

        .upload-content {
          position: relative;
          z-index: 2;
        }

        .upload-icon {
          color: #6b7280;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .upload-area:hover .upload-icon {
          color: #4f46e5;
          transform: scale(1.1);
        }

        .upload-area h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .upload-area p {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .uploading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .uploading-state p {
          color: #10b981;
          font-weight: 500;
          margin: 0;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #d1fae5;
          border-top: 3px solid #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Dark mode styles */
        [data-theme="dark"] .upload-area {
          background: #1f2937;
          border-color: #374151;
        }

        [data-theme="dark"] .upload-area:hover {
          background: #1e3a8a;
          border-color: #6366f1;
        }

        [data-theme="dark"] .upload-area.drag-over {
          background: #1e3a8a;
          border-color: #6366f1;
        }

        [data-theme="dark"] .upload-area.uploading {
          background: #064e3b;
          border-color: #10b981;
        }

        [data-theme="dark"] .upload-area h3 {
          color: #f9fafb;
        }

        [data-theme="dark"] .upload-area p {
          color: #d1d5db;
        }

        [data-theme="dark"] .file-info {
          color: #9ca3af;
        }

        [data-theme="dark"] .upload-icon {
          color: #9ca3af;
        }

        [data-theme="dark"] .upload-area:hover .upload-icon {
          color: #a5b4fc;
        }

        @media (max-width: 768px) {
          .upload-area {
            padding: 2rem 1rem;
          }

          .upload-icon svg {
            width: 36px;
            height: 36px;
          }

          .upload-area h3 {
            font-size: 1.125rem;
          }

          .file-info {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ImageUpload