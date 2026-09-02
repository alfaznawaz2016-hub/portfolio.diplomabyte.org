import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4'

const BRANDS = [
  { name: 'Vortex', letter: 'V' },
  { name: 'Nimbus', letter: 'N' },
  { name: 'Prysma', letter: 'P' },
  { name: 'Cirrus', letter: 'C' },
  { name: 'Kynder', letter: 'K' },
  { name: 'Halcyn', letter: 'H' },
]

function App() {
  const videoRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let fadeStartTime = null
    let fadeDuration = 500 // 0.5s in ms
    let videoDuration = 0

    const animateFade = (timestamp) => {
      if (!fadeStartTime) fadeStartTime = timestamp
      
      const elapsed = timestamp - fadeStartTime
      const progress = Math.min(elapsed / fadeDuration, 1)

      if (isFadingOut) {
        // Fade out
        video.style.opacity = 1 - progress
      } else {
        // Fade in
        video.style.opacity = progress
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateFade)
      } else {
        if (!isFadingOut) {
          // Fade in complete, start monitoring for fade out
          videoDuration = video.duration * 1000
          setTimeout(() => {
            setIsFadingOut(true)
            fadeStartTime = null
            animationFrameRef.current = requestAnimationFrame(animateFade)
          }, videoDuration - fadeDuration)
        }
      }
    }

    const handleEnded = () => {
      video.style.opacity = 0
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        setIsFadingOut(false)
        fadeStartTime = null
        animationFrameRef.current = requestAnimationFrame(animateFade)
      }, 100)
    }

    video.addEventListener('ended', handleEnded)

    // Start fade in when video loads
    if (video.readyState >= 2) {
      fadeStartTime = null
      animationFrameRef.current = requestAnimationFrame(animateFade)
    } else {
      video.addEventListener('loadeddata', () => {
        fadeStartTime = null
        animationFrameRef.current = requestAnimationFrame(animateFade)
      })
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      video.removeEventListener('ended', handleEnded)
    }
  }, [isFadingOut])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Video Wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Blurred Overlay Shape */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] bg-gray-950 opacity-90 blur-[82px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen" style={{ overflow: 'visible' }}>
        
        {/* Navbar */}
        <nav className="w-full py-5 px-8 flex flex-row justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="DiplomaByte" className="h-8" />
          </div>

          {/* Center: Nav Items */}
          <div className="flex items-center gap-8">
            <button className="text-foreground/90 hover:text-foreground transition-colors flex items-center gap-1">
              Features
              <ChevronDown size={16} />
            </button>
            <button className="text-foreground/90 hover:text-foreground transition-colors">
              Solutions
            </button>
            <button className="text-foreground/90 hover:text-foreground transition-colors">
              Plans
            </button>
            <button className="text-foreground/90 hover:text-foreground transition-colors flex items-center gap-1">
              Learning
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Right: Sign Up Button */}
          <button className="hero-secondary rounded-full px-4 py-2 text-sm font-medium">
            Sign Up
          </button>
        </nav>

        {/* Gradient Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-[3px]" />

        {/* Hero Content */}
        <main className="flex-1 flex items-center justify-center flex-col px-8">
          <h1 
            className="text-[220px] font-normal leading-[1.02] tracking-[-0.024em] font-heading text-center"
            style={{ fontFamily: 'General Sans, sans-serif' }}
          >
            <span className="text-foreground">Power </span>
            <span 
              className="text-transparent"
              style={{
                background: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}
            >
              AI
            </span>
          </h1>

          <p className="text-hero-sub text-lg leading-8 max-w-md mt-[9px] opacity-80 text-center">
            The most powerful AI ever deployed<br />in talent acquisition
          </p>

          <button className="hero-secondary rounded-full px-[29px] py-[24px] mt-[25px] text-base font-medium">
            Schedule a Consult
          </button>
        </main>

        {/* Logo Marquee */}
        <footer className="pb-10 px-8">
          <div className="max-w-5xl mx-auto flex items-center gap-12">
            <div className="text-foreground/50 text-sm whitespace-nowrap">
              Relied on by brands<br />across the globe
            </div>
            
            <div className="flex overflow-hidden flex-1">
              <div className="flex animate-marquee gap-16">
                {[...BRANDS, ...BRANDS].map((brand, index) => (
                  <div key={`${brand.name}-${index}`} className="flex items-center gap-2 flex-shrink-0">
                    <div className="liquid-glass w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold">
                      {brand.letter}
                    </div>
                    <span className="text-base font-semibold text-foreground">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App
