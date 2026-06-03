import { useState, useEffect } from 'react';
import { factorSets } from '../data/questions';

const targets = Object.keys(factorSets).map(Number);

function pickTarget() {
  return targets[Math.floor(Math.random() * targets.length)];
}

export default function FactorGrid({ lang = { check: "Check ✓", next: "Try another →" } }) {
  const [target, setTarget] = useState(pickTarget);
  const [selected, setSelected] = useState(new Set());
  const [result, setResult] = useState(null);

  useEffect(() => {
    setSelected(new Set());
    setResult(null);
  }, [target]);

  const toggle = (n) => {
    if (result) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const check = () => {
    const correct = factorSets[target];
    const sel = [...selected];
    const ok = correct.length === sel.length && correct.every(f => sel.includes(f));
    setResult({ ok, correct });
    if (ok) setTimeout(() => { setTarget(pickTarget()); }, 2000);
  };

  const nums = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>✖️</div>
        <div>
          <div className="card-title">Multiples & Factors</div>
          <div className="card-sub">Find all factors by clicking numbers on the grid</div>
        </div>
      </div>
      <div style={{ fontSize: '.875rem', fontWeight: 700, marginBottom: '.4rem' }}>
        Find all factors of{' '}
        <span style={{ color: '#e8541a', fontSize: '1.1rem' }}>{target}</span>
      </div>
      <div className="grid-game">
        {nums.map(n => (
          <div
            key={n}
            className={[
              'grid-cell',
              selected.has(n) ? 'selected' : '',
              result && factorSets[target].includes(n) ? 'factor' : '',
            ].join(' ')}
            onClick={() => toggle(n)}
          >
            {n}
          </div>
        ))}
      </div>
      <div style={{ fontSize: '.8rem', color: result ? (result.ok ? '#0d5c33' : '#7a2400') : '#666', marginBottom: '.4rem' }}>
        {result
          ? result.ok
            ? `✅ Perfect! Factors of ${target}: ${result.correct.join(', ')}`
            : `❌ Factors of ${target} are: ${result.correct.join(', ')}`
          : 'Click the numbers that are factors'}
      </div>
      {!result && (
        <button className="check-btn" onClick={check}>Check ✓</button>
      )}
      {result && !result.ok && (
        <button className="next-btn" style={{ background: '#e8541a' }} onClick={() => setTarget(pickTarget())}>
          Try another →
        </button>
      )}
    </div>
  );
}
