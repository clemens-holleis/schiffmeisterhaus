export function isMobileDevice() {
  // Modern browsers with userAgentData
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // Fallback for older browsers using userAgent
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  // Check for Android, iOS, Windows Phone
  return /android|iphone|ipad|ipod|windows phone|iemobile|opera mini/i.test(ua);
}

