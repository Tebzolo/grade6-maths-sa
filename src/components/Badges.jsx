import { useState } from 'react';
import { badges } from '../data/questions';

export default function Badges({ earnedBadges, lang }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ margin: '0 0 1rem' }}>
      <button
        onClick={() => setShow(s => !s)}
        style={{
          width: '100%', padding: '.6rem 1rem', borderRadius: '12px',
          background: '#fff7e6', border: '1.5px solid #f5c96a',
          fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '.9rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span>🏅 {lang.badges} ({earnedBadges.length}/{badges.length})</span>
        <span>{show ? '▲' : '▼'}</span>
      </button>
      {show && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px',
          background: '#fff', border: '1px solid #e0d8cf', borderRadius: '0 0 12px 12px',
          padding: '1rem',
        }}>
          {badges.map(b => {
            const earned = earnedBadges.includes(b.id);
            return (
              <div key={b.id} style={{
                padding: '.6rem .75rem', borderRadius: '10px',
                background: earned ? '#fff7e6' : '#f7f3ee',
                border: `1.5px solid ${earned ? '#f5c96a' : '#e0d8cf'}`,
                opacity: earned ? 1 : 0.45,
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ fontSize: '1.4rem' }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: '.8rem', fontWeight: 700 }}>{b.label}</div>
                  <div style={{ fontSize: '.7rem', color: '#666' }}>{b.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
