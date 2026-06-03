import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    // iOS detection
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    if (ios) {
      setIsIOS(true);
      const dismissed = localStorage.getItem('pwa_ios_dismissed');
      if (!dismissed) setTimeout(() => setShowIOS(true), 3000);
      return;
    }

    // Android / Chrome install prompt
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setTimeout(() => setShow(true), 2000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setShow(false);
  };

  const dismissIOS = () => {
    localStorage.setItem('pwa_ios_dismissed', '1');
    setShowIOS(false);
  };

  if (installed || (!show && !showIOS)) return null;

  // iOS instructions
  if (showIOS) {
    return (
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
        background: '#fff', borderTop: '2px solid #1a7fe8',
        padding: '1rem 1.25rem 1.5rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        fontFamily: "'Nunito', sans-serif",
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="./icon-192.png" alt="icon" style={{ width: 40, height: 40, borderRadius: 10 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '.95rem' }}>Install Maths Explorer</div>
              <div style={{ fontSize: '.75rem', color: '#666' }}>Add to your home screen</div>
            </div>
          </div>
          <button onClick={dismissIOS} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#999' }}>✕</button>
        </div>
        <div style={{ background: '#f0f4ff', borderRadius: '10px', padding: '.75rem', fontSize: '.82rem', lineHeight: 1.6 }}>
          <div>1. Tap the <strong>Share button</strong> at the bottom of Safari 
            <span style={{ background: '#e8f3fd', borderRadius: '4px', padding: '1px 6px', marginLeft: '4px' }}>⬆</span>
          </div>
          <div>2. Scroll down and tap <strong>"Add to Home Screen"</strong></div>
          <div>3. Tap <strong>"Add"</strong> — done! 🎉</div>
        </div>
      </div>
    );
  }

  // Android install banner
  return (
    <div style={{
      position: 'fixed', bottom: '1rem', left: '1rem', right: '1rem', zIndex: 999,
      background: '#fff', borderRadius: '16px', border: '2px solid #1a7fe8',
      padding: '1rem 1.25rem',
      boxShadow: '0 8px 32px rgba(26,127,232,0.2)',
      fontFamily: "'Nunito', sans-serif",
      display: 'flex', alignItems: 'center', gap: '12px',
    }}>
      <img src="./icon-192.png" alt="icon" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: '.95rem', marginBottom: '2px' }}>Install as App 📱</div>
        <div style={{ fontSize: '.75rem', color: '#666' }}>Works offline · Home screen icon · No App Store needed</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
        <button onClick={install} style={{
          padding: '.4rem .9rem', borderRadius: '999px',
          background: '#1a7fe8', color: '#fff', border: 'none',
          fontWeight: 800, fontSize: '.82rem', cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
        }}>Install</button>
        <button onClick={() => setShow(false)} style={{
          padding: '.3rem .6rem', borderRadius: '999px',
          background: 'none', color: '#999', border: '1px solid #e0d8cf',
          fontWeight: 600, fontSize: '.75rem', cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
        }}>Not now</button>
      </div>
    </div>
  );
}
