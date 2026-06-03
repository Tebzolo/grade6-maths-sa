import { useState } from 'react';
import { areaProblems } from '../data/questions';

function pick() {
  return areaProblems[Math.floor(Math.random() * areaProblems.length)];
}

export default function AreaPerimeter({ lang = { check: "Check", next: "New shape →" } }) {
  const [prob, setProb] = useState(pick);
  const [areaVal, setAreaVal] = useState('');
  const [periVal, setPeriVal] = useState('');
  const [result, setResult] = useState(null);

  const check = () => {
    const area = prob.l * prob.w;
    const peri = 2 * (prob.l + prob.w);
    const ok = parseInt(areaVal) === area && parseInt(periVal) === peri;
    setResult({ ok, area, peri });
  };

  const next = () => {
    setProb(pick());
    setAreaVal('');
    setPeriVal('');
    setResult(null);
  };

  const u = prob.unit;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f0f4ff' }}>📏</div>
        <div>
          <div className="card-title">Area & Perimeter</div>
          <div className="card-sub">Calculate for rectangles and squares</div>
        </div>
      </div>
      <div style={{ fontSize: '.9rem', fontWeight: 700, margin: '.25rem 0' }}>
        Find the area and perimeter of a{' '}
        <span style={{ color: '#18a45a' }}>{prob.type}</span> with length{' '}
        <span style={{ color: '#e8541a' }}>{prob.l} {u}</span> and width{' '}
        <span style={{ color: '#1a7fe8' }}>{prob.w} {u}</span>
      </div>
      <svg viewBox="0 0 220 120" style={{ maxWidth: 200, display: 'block', margin: '.5rem 0' }}>
        <rect x="20" y="15" width="180" height="80" fill="#e8f3fd" stroke="#1a7fe8" strokeWidth="2.5" rx="4" />
        <text x="110" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#185fa5">{prob.type}</text>
        <text x="110" y="110" textAnchor="middle" fontSize="12" fill="#e8541a">{prob.l} {u}</text>
        <text x="8" y="58" textAnchor="middle" fontSize="12" fill="#1a7fe8" transform="rotate(-90,8,58)">{prob.w} {u}</text>
      </svg>
      <div className="calc-row">
        <span className="calc-label">Area =</span>
        <input className="calc-input" type="number" value={areaVal} onChange={e => setAreaVal(e.target.value)} placeholder="?" disabled={!!result} />
        <span className="calc-label">{u}²</span>
      </div>
      <div className="calc-row">
        <span className="calc-label">Perimeter =</span>
        <input className="calc-input" type="number" value={periVal} onChange={e => setPeriVal(e.target.value)} placeholder="?" disabled={!!result} />
        <span className="calc-label">{u}</span>
        {!result && <button className="check-btn" onClick={check}>Check</button>}
      </div>
      {result && (
        <div className={`feedback ${result.ok ? 'ok' : 'fail'}`}>
          {result.ok
            ? `✅ Correct! Area = ${result.area} ${u}² · Perimeter = ${result.peri} ${u}`
            : `❌ Area = ${result.area} ${u}² · Perimeter = ${result.peri} ${u}`}
        </div>
      )}
      <button className="next-btn" style={{ background: '#18a45a', display: 'block', marginTop: '.6rem' }} onClick={next}>
        New shape →
      </button>
    </div>
  );
}
