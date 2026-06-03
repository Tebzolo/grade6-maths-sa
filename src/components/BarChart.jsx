import { useState, useEffect } from 'react';

const SUBJECTS = ['Maths', 'Science', 'English', 'isiZulu', 'History', 'Art', 'PE'];
const COLORS = ['#1a7fe8', '#18a45a', '#e8541a', '#b318a4', '#c8860a', '#e84a1a', '#0a8a8a'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChart() {
  const labels = shuffle([...SUBJECTS]).slice(0, 5);
  const values = labels.map(() => Math.floor(Math.random() * 20) + 5);
  const maxIdx = values.indexOf(Math.max(...values));
  const qs = [
    { q: `How many learners chose ${labels[0]}?`, ans: values[0] },
    { q: `Which subject had the most learners? (enter the number)`, ans: values[maxIdx] },
    { q: `How many more learners chose ${labels[0]} than ${labels[1]}? (enter the difference)`, ans: Math.abs(values[0] - values[1]) },
    { q: `What is the total number of learners surveyed?`, ans: values.reduce((a, b) => a + b, 0) },
  ];
  const q = qs[Math.floor(Math.random() * qs.length)];
  return { labels, values, q };
}

export default function BarChart({ lang = { check: "Check", next: "New chart →" } }) {
  const [chart, setChart] = useState(makeChart);
  const [val, setVal] = useState('');
  const [result, setResult] = useState(null);

  const { labels, values, q } = chart;
  const max = Math.max(...values);
  const W = 300, H = 160, padL = 32, padB = 30, barW = 36, gap = 8;
  const chartH = H - padB - 10;

  const check = () => {
    const ok = parseInt(val) === q.ans;
    setResult({ ok });
  };

  const next = () => {
    setChart(makeChart());
    setVal('');
    setResult(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fff7e6' }}>📈</div>
        <div>
          <div className="card-title">Bar Graph Reading</div>
          <div className="card-sub">Interpret a bar chart — favourite subjects survey</div>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, display: 'block', margin: '0 auto' }}>
        <line x1={padL} y1="10" x2={padL} y2={H - padB} stroke="#ccc" strokeWidth="1" />
        <line x1={padL} y1={H - padB} x2={W - 8} y2={H - padB} stroke="#ccc" strokeWidth="1" />
        {labels.map((label, i) => {
          const x = padL + 10 + i * (barW + gap);
          const bh = Math.round((values[i] / max) * chartH);
          const y = H - padB - bh;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={bh} rx="4" fill={COLORS[i]} opacity="0.85" />
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={COLORS[i]}>{values[i]}</text>
              <text x={x + barW / 2} y={H - padB + 14} textAnchor="middle" fontSize="9.5" fill="#555">{label}</text>
            </g>
          );
        })}
      </svg>
      <div className="q-box" style={{ marginTop: '.5rem' }}>
        <div className="q-text">{q.q}</div>
        <div className="calc-row">
          <input className="calc-input" type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="?" disabled={!!result} />
          {!result && <button className="check-btn" onClick={check}>Check</button>}
        </div>
        {result && (
          <div className={`feedback ${result.ok ? 'ok' : 'fail'}`}>
            {result.ok ? '✅ Correct!' : `❌ The answer is ${q.ans}`}
          </div>
        )}
        <button className="next-btn" style={{ background: '#c8860a', display: 'block', marginTop: '.6rem' }} onClick={next}>
          New chart →
        </button>
      </div>
    </div>
  );
}
