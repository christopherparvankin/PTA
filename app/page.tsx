'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const textChunks = [
  "A man stands before the mirror. His own eyes search him, and in the silence he asks, who do I wish to become?",
  "Before him, a road forks. One path carries light, trembling and fragile; the other, shadowed, wet with regret. Choose wrongly, and he will learn—all that awaits is grief's unyielding hand, a harvest of pain, and a garden of loss.",
  "But in this moment of choice, a scent drifts through the air... golden, crispy, irresistible. Nacho fries call to him from the shadows.",
  "This man is no stranger, for this man is you.",
  "And in your trembling hands lies the weight of your becoming—and the fate of nacho fries everywhere.",
  "What choice shall you make?"
]

export default function Home() {
  const [currentChunk, setCurrentChunk] = useState(-1)
  const [showImage, setShowImage] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const startExperience = async () => {
    setHasStarted(true)
    
    // Try to play audio starting at 41 seconds with fade in
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 41 // Start at 41 seconds
        audioRef.current.volume = 0 // Start with no volume
        await audioRef.current.play()
        
        // Fade in the volume over 3 seconds
        const fadeInInterval = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 1) {
            audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 1)
          } else {
            clearInterval(fadeInInterval)
          }
        }, 150) // Adjust volume every 150ms for smooth fade
      } catch (error) {
        console.log('Audio autoplay blocked:', error)
        // Audio will play on user interaction
      }
    }

    // Start text sequence after a brief delay
    const textTimer = setTimeout(() => {
      // Show first chunk with fade in
      setCurrentChunk(0)
      setTimeout(() => {
        setIsVisible(true)
      }, 100) // Small delay to ensure the element is rendered before fading in
      
      let chunkIndex = 1
      const interval = setInterval(() => {
        // Fade out current text
        setIsVisible(false)
        
        // After fade out, change text and fade in
        setTimeout(() => {
          setCurrentChunk(chunkIndex)
          setIsVisible(true)
        }, 1000) // Wait for fade out to complete
        
        chunkIndex++
        
        if (chunkIndex >= textChunks.length) {
          clearInterval(interval)
          // Show image after text sequence completes
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
              setShowImage(true)
              setTimeout(() => {
                setImageVisible(true)
              }, 100) // Small delay to ensure image is rendered before fading in
            }, 1000) // Wait for final fade out
          }, 3000) // Wait only 3 seconds after last text chunk
        }
      }, 7000) // Show each chunk for 7 seconds (5s visible + 2s transition)

      return () => clearInterval(interval)
    }, 1000) // Start text sequence 1 second after page load

    return () => clearTimeout(textTimer)
  }

  return (
    <main style={{ 
      backgroundColor: '#000000', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src="/audio.mp3" 
        loop={false}
        preload="auto"
      />
      
      {!hasStarted ? (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={startExperience}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '2px solid #ffffff',
              padding: isMobile ? '15px 30px' : '20px 40px',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontFamily: 'Arial, Helvetica, sans-serif',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
              e.currentTarget.style.color = '#000000'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#ffffff'
            }}
          >
            Press for Fate & Fries
          </button>
        </div>
      ) : !showImage ? (
        <div style={{ 
          position: 'relative',
          height: '100vh', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '15px' : '20px'
        }}>
          {currentChunk >= 0 && (
            <p 
              style={{
                color: '#ffffff',
                fontSize: isMobile ? '1.3rem' : '2rem',
                lineHeight: isMobile ? '1.5' : '1.6',
                textAlign: 'center',
                fontFamily: 'Arial, Helvetica, sans-serif',
                maxWidth: isMobile ? '100%' : '1000px',
                width: '100%',
                margin: '0',
                padding: isMobile ? '0 10px' : '0',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                display: 'block',
                whiteSpace: 'normal',
                wordBreak: 'normal'
              }}
            >
              {textChunks[currentChunk]}
            </p>
          )}
        </div>
      ) : (
        <div 
          key={showImage ? 'image-visible' : 'image-hidden'}
          style={{
            opacity: imageVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '15px' : '20px'
          }}>
          <Image
            src="/screenshot.png"
            alt="Final Image"
            width={isMobile ? 400 : 800}
            height={isMobile ? 300 : 600}
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: isMobile ? '8px' : '0'
            }}
          />
        </div>
      )}
    </main>
  )
}
