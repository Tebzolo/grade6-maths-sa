import { useState, useEffect } from 'react';

function makeProblem() {
  const d = Math.floor(Math.random() * 85) + 15;
  const a = Math.floor(Math.random() * 900) + 100;
  const n = a * d + Math.floor(Math.random() * d);
  return { n, d, ans: Math.floor(n / d), rem: n % d };
}

export default function LongDivision({ lang = { check: "Check", next: "New problem →" } }) {
  const [prob, setProb] = useState(makeProblem);
  const [ansVal, setAnsVal] = useState('');
  const [remVal, setRemVal] = useState('');
  const [result, setResult] = useState(null);

  const check = () => {
    const ga = parseInt(ansVal);
    const gr = parseInt(remVal);
    const ok = ga === prob.ans && gr === prob.rem;
    setResult({ ok, ans: prob.ans, rem: prob.rem });
  };

  const next = () => {
    setProb(makeProblem());
    setAnsVal('');
    setRemVal('');
    setResult(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f0f4ff' }}>🧮</div>
        <div>
          <div className="card-title">Long Division</div>
          <div className="card-sub">Divide 4-digit numbers by 2-digit divisors</div>
        </div>
      </div>
      <div style={{ fontSize: '1.2rem', fontWeight: 800, margin: '.25rem 0 .75rem' }}>
        {prob.n} ÷ {prob.d} = ?
      </div>
      <div className="calc-row">
        <span className="calc-label">Answer =</span>
        <input className="calc-input" type="number" value={ansVal} onChange={e => setAnsVal(e.target.value)} placeholder="?" disabled={!!result} />
        <span className="calc-label">remainder</span>
        <input className="calc-input" type="number" value={remVal} onChange={e => setRemVal(e.target.value)} placeholder="r" style={{ width: 56 }} disabled={!!result} />
        {!result && <button className="check-btn" onClick={check}>Check</button>}
      </div>
      {result && (
        <div className={`feedback ${result.ok ? 'ok' : 'fail'}`}>
          {result.ok
            ? `✅ Correct! ${prob.n} ÷ ${prob.d} = ${result.ans} remainder ${result.rem}`
            : `❌ Answer: ${result.ans} remainder ${result.rem}`}
        </div>
      )}
      <button className="next-btn" style={{ background: '#e8541a', display: 'block', marginTop: '.6rem' }} onClick={next}>
        New problem →
      </button>
    </div>
  );
}
