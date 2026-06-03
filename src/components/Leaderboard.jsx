import { useState, useEffect } from 'react';

const STORAGE_KEY = 'g6maths_leaderboard';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function Leaderboard({ totalCorrect, totalAnswered, lang }) {
  const [entries, setEntries] = useState(load);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);

  const submit = () => {
    if (!name.trim() || totalAnswered === 0) return;
    const pct = Math.round((totalCorrect / totalAnswered) * 100);
    const entry = { name: name.trim(), score: totalCorrect, total: totalAnswered, pct, date: new Date().toLocaleDateString('en-ZA') };
    const updated = [...entries, entry].sort((a, b) => b.pct - a.pct || b.score - a.score).slice(0, 10);
    setEntries(updated);
    save(updated);
    setSaved(true);
  };

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ margin: '0 0 1rem' }}>
      <button
        onClick={() => setShow(s => !s)}
        style={{
          width: '100%', padding: '.6rem 1rem', borderRadius: '12px',
          background: '#e8f3fd', border: '1.5px solid #b5d4f4',
          fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: '.9rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span>🏆 {lang.leaderboard}</span>
        <span>{show ? '▲' : '▼'}</span>
      </button>
      {show && (
        <div style={{ background: '#fff', border: '1px solid #e0d8cf', borderRadius: '0 0 12px 12px', padding: '1rem' }}>
          {!saved && totalAnswered > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  flex: 1, minWidth: 140, padding: '.4rem .75rem', borderRadius: '8px',
                  border: '2px solid #e0d8cf', fontFamily: "'Nunito',sans-serif", fontSize: '.875rem',
                }}
              />
              <button className="check-btn" onClick={submit}>Save Score</button>
            </div>
          )}
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', fontSize: '.85rem', padding: '1rem' }}>
              No scores yet — be the first! 🌟
            </div>
          ) : (
            <div>
              {entries.map((e, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '.45rem .5rem', borderRadius: '8px',
                  background: i === 0 ? '#fff7e6' : i % 2 === 0 ? '#f7f3ee' : '#fff',
                  marginBottom: '4px',
                }}>
                  <span style={{ fontSize: '1.1rem', width: '24px' }}>{medals[i] || `${i + 1}.`}</span>
                  <span style={{ flex: 1, fontWeight: 700, fontSize: '.875rem' }}>{e.name}</span>
                  <span style={{ fontSize: '.8rem', color: '#666' }}>{e.score}/{e.total}</span>
                  <span style={{
                    fontWeight: 800, fontSize: '.85rem', color: '#fff',
                    background: e.pct >= 80 ? '#18a45a' : e.pct >= 60 ? '#c8860a' : '#e8541a',
                    padding: '.15rem .5rem', borderRadius: '999px',
                  }}>{e.pct}%</span>
                  <span style={{ fontSize: '.7rem', color: '#999' }}>{e.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
