import { useEffect, useState } from 'react';

export default function BadgeToast({ badge, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 400); }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: `translateX(-50%) translateY(${visible ? 0 : '100px'})`,
      background: '#fff', border: '2px solid #f5c96a', borderRadius: '16px',
      padding: '1rem 1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', gap: '12px',
      zIndex: 1000, transition: 'transform .4s ease',
      fontFamily: "'Nunito',sans-serif", minWidth: '240px',
    }}>
      <span style={{ fontSize: '2rem' }}>{badge.icon}</span>
      <div>
        <div style={{ fontSize: '.7rem', fontWeight: 700, color: '#c8860a', letterSpacing: '.05em' }}>NEW BADGE UNLOCKED!</div>
        <div style={{ fontSize: '1rem', fontWeight: 800 }}>{badge.label}</div>
        <div style={{ fontSize: '.75rem', color: '#666' }}>{badge.desc}</div>
      </div>
    </div>
  );
}
