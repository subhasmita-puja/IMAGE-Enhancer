const API_KEY = "wx53k5ae1e9fonczr"
const BASE_URL = "https://techhk.aoscdn.com"
const MAXIMUM_RETRIES = 40 // Increased retries
const INITIAL_POLL_DELAY = 2000 // Start with 2 seconds
const MAX_POLL_DELAY = 10000 // Max 10 seconds between polls

export const enhanceImageAPI = async (file) => {
  try {
    console.log("Starting image enhancement process...")
    
    // First try the external API
    try {
      const taskId = await uploadImage(file)
      console.log("Image uploaded successfully, Task ID:", taskId)

      const enhancedImageData = await pollForEnhancedImage(taskId)
      console.log("Enhanced image data:", enhancedImageData)

      return enhancedImageData
    } catch (apiError) {
      console.warn("External API failed, falling back to local enhancement:", apiError.message)
      
      // Fallback to local enhancement
      return await localImageEnhancement(file)
    }
  } catch (error) {
    console.error("Error enhancing image:", error)
    throw error
  }
}

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("image_file", file)

  try {
    const response = await fetch(`${BASE_URL}/api/tasks/visual/scale`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Upload response:", data)

    if (!data?.data?.task_id) {
      throw new Error("Failed to upload image! Task ID not found in response.")
    }

    return data.data.task_id
  } catch (error) {
    console.error("Upload error:", error)
    throw new Error(`Failed to upload image: ${error.message}`)
  }
}

const pollForEnhancedImage = async (taskId, retries = 0) => {
  try {
    console.log(`Polling attempt ${retries + 1}/${MAXIMUM_RETRIES} for task ${taskId}`)
    
    const result = await fetchEnhancedImage(taskId)
    console.log("Poll result:", result)

    // State 4 means still processing
    if (result.state === 4) {
      console.log(`Processing... (${retries + 1}/${MAXIMUM_RETRIES})`)

      if (retries >= MAXIMUM_RETRIES) {
        throw new Error("Maximum retries reached. Image processing took too long.")
      }

      // Progressive delay - start fast, then slow down
      const delay = Math.min(INITIAL_POLL_DELAY + (retries * 500), MAX_POLL_DELAY)
      console.log(`Waiting ${delay}ms before next poll...`)
      
      await new Promise((resolve) => setTimeout(resolve, delay))
      return pollForEnhancedImage(taskId, retries + 1)
    }

    // State 3 means failed
    if (result.state === 3) {
      throw new Error(`Image enhancement failed: ${result.message || 'Unknown error'}`)
    }

    // State 2 means completed successfully
    if (result.state === 2) {
      console.log("Enhanced image completed successfully:", result)
      
      // Return the result with the enhanced image URL
      if (result.output && result.output.length > 0) {
        return {
          ...result,
          enhancedImageUrl: result.output[0]
        }
      } else {
        throw new Error("Enhancement completed but no output image found")
      }
    }

    // State 1 might mean queued/starting
    if (result.state === 1) {
      console.log(`Task queued... (${retries + 1}/${MAXIMUM_RETRIES})`)
      
      if (retries >= MAXIMUM_RETRIES) {
        throw new Error("Maximum retries reached. Task remained in queue too long.")
      }

      const delay = Math.min(INITIAL_POLL_DELAY + (retries * 300), MAX_POLL_DELAY)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return pollForEnhancedImage(taskId, retries + 1)
    }

    // For any other state, continue polling with a limit
    console.log(`Unknown state ${result.state}, continuing to poll...`)
    
    if (retries >= MAXIMUM_RETRIES) {
      throw new Error(`Maximum retries reached. Final state: ${result.state}`)
    }

    const delay = Math.min(INITIAL_POLL_DELAY + (retries * 400), MAX_POLL_DELAY)
    await new Promise((resolve) => setTimeout(resolve, delay))
    return pollForEnhancedImage(taskId, retries + 1)

  } catch (error) {
    if (retries >= MAXIMUM_RETRIES) {
      throw error
    }
    
    console.error(`Polling error (attempt ${retries + 1}):`, error)
    
    // If it's a network error, retry with exponential backoff
    if (error.message.includes('fetch') || error.message.includes('network')) {
      console.log("Network error, retrying with backoff...")
      const delay = Math.min(INITIAL_POLL_DELAY * Math.pow(1.5, retries), MAX_POLL_DELAY)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return pollForEnhancedImage(taskId, retries + 1)
    }
    
    // For other errors, throw immediately
    throw error
  }
}

const fetchEnhancedImage = async (taskId) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    const response = await fetch(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json"
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Fetch failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Fetch response:", data)

    if (!data?.data) {
      throw new Error("Failed to fetch task status! No data in response.")
    }

    return data.data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server took too long to respond')
    }
    console.error("Fetch error:", error)
    throw new Error(`Failed to fetch task status: ${error.message}`)
  }
}

// Local image enhancement fallback using JavaScript
const localImageEnhancement = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Starting local image enhancement...")
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        try {
          // Set canvas size (upscale by 2x)
          const scale = 2
          canvas.width = img.width * scale
          canvas.height = img.height * scale
          
          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          
          // Draw the original image scaled up
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          
          // Get image data for processing
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          
          // Apply enhancement filters
          for (let i = 0; i < data.length; i += 4) {
            // Increase contrast and brightness
            const brightness = 1.1
            const contrast = 1.2
            
            // Apply brightness and contrast
            data[i] = Math.min(255, Math.max(0, (data[i] - 128) * contrast + 128 + (brightness - 1) * 255))     // Red
            data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * contrast + 128 + (brightness - 1) * 255)) // Green
            data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * contrast + 128 + (brightness - 1) * 255)) // Blue
            
            // Enhance saturation
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
            const saturation = 1.3
            
            data[i] = Math.min(255, Math.max(0, gray + saturation * (data[i] - gray)))
            data[i + 1] = Math.min(255, Math.max(0, gray + saturation * (data[i + 1] - gray)))
            data[i + 2] = Math.min(255, Math.max(0, gray + saturation * (data[i + 2] - gray)))
          }
          
          // Apply sharpening filter
          const sharpenedData = applySharpenFilter(imageData, canvas.width, canvas.height)
          ctx.putImageData(sharpenedData, 0, 0)
          
          // Convert to blob and create URL
          canvas.toBlob((blob) => {
            if (blob) {
              const enhancedUrl = URL.createObjectURL(blob)
              console.log("Local enhancement completed successfully")
              
              resolve({
                state: 2,
                enhancedImageUrl: enhancedUrl,
                message: "Enhanced locally using JavaScript",
                isLocal: true
              })
            } else {
              reject(new Error("Failed to create enhanced image blob"))
            }
          }, 'image/jpeg', 0.95)
          
        } catch (error) {
          console.error("Error during local enhancement:", error)
          reject(new Error(`Local enhancement failed: ${error.message}`))
        }
      }
      
      img.onerror = () => {
        reject(new Error("Failed to load image for local enhancement"))
      }
      
      // Load the image
      img.src = URL.createObjectURL(file)
      
    } catch (error) {
      console.error("Error setting up local enhancement:", error)
      reject(new Error(`Local enhancement setup failed: ${error.message}`))
    }
  })
}

// Sharpening filter implementation
const applySharpenFilter = (imageData, width, height) => {
  const data = imageData.data
  const output = new ImageData(width, height)
  const outputData = output.data
  
  // Sharpening kernel
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ]
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      
      for (let c = 0; c < 3; c++) { // RGB channels
        let sum = 0
        
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelIdx = ((y + ky) * width + (x + kx)) * 4 + c
            const kernelIdx = (ky + 1) * 3 + (kx + 1)
            sum += data[pixelIdx] * kernel[kernelIdx]
          }
        }
        
        outputData[idx + c] = Math.min(255, Math.max(0, sum))
      }
      
      outputData[idx + 3] = data[idx + 3] // Alpha channel
    }
  }
  
  // Copy edges from original
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        const idx = (y * width + x) * 4
        for (let c = 0; c < 4; c++) {
          outputData[idx + c] = data[idx + c]
        }
      }
    }
  }
  
  return output
}