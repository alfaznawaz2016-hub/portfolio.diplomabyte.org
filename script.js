// Video fade animation
const video = document.getElementById('hero-video');
let animationFrameId = null;
let isFadingOut = false;

function animateFade(timestamp, fadeStartTime, fadeDuration) {
  if (!fadeStartTime) fadeStartTime = timestamp;
  
  const elapsed = timestamp - fadeStartTime;
  const progress = Math.min(elapsed / fadeDuration, 1);

  if (isFadingOut) {
    // Fade out
    video.style.opacity = 1 - progress;
  } else {
    // Fade in
    video.style.opacity = progress;
  }

  if (progress < 1) {
    animationFrameId = requestAnimationFrame((ts) => animateFade(ts, fadeStartTime, fadeDuration));
  } else {
    if (!isFadingOut) {
      // Fade in complete, start monitoring for fade out
      const videoDuration = video.duration * 1000;
      setTimeout(() => {
        isFadingOut = true;
        animationFrameId = requestAnimationFrame((ts) => animateFade(ts, null, fadeDuration));
      }, videoDuration - fadeDuration);
    }
  }
}

function handleVideoEnded() {
  video.style.opacity = 0;
  setTimeout(() => {
    video.currentTime = 0;
    video.play();
    isFadingOut = false;
    animationFrameId = requestAnimationFrame((ts) => animateFade(ts, null, 500));
  }, 100);
}

video.addEventListener('ended', handleVideoEnded);

// Start fade in when video loads
if (video.readyState >= 2) {
  animationFrameId = requestAnimationFrame((ts) => animateFade(ts, null, 500));
} else {
  video.addEventListener('loadeddata', () => {
    animationFrameId = requestAnimationFrame((ts) => animateFade(ts, null, 500));
  });
}

// Marquee - duplicate logos for seamless loop
const marqueeTrack = document.getElementById('marquee-track');
const logos = marqueeTrack.querySelectorAll('.marquee-logo');

// Clone all logos and append for seamless infinite scroll
logos.forEach(logo => {
  const clone = logo.cloneNode(true);
  marqueeTrack.appendChild(clone);
});
