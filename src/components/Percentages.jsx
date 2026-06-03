import { useState } from 'react';
import { pctProblems } from '../data/questions';

function pick() {
  return pctProblems[Math.floor(Math.random() * pctProblems.length)];
}

export default function Percentages() {
  const [prob, setProb] = useState(pick);
  const [val, setVal] = useState('');
  const [result, setResult] = useState(null);

  const check = () => {
    const ok = parseFloat(val) === prob.ans;
    setResult({ ok });
  };

  const next = () => {
    setProb(pick());
    setVal('');
    setResult(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>%</div>
        <div>
          <div className="card-title">Percentages</div>
          <div className="card-sub">Convert between fractions, decimals and %</div>
        </div>
      </div>
      <div className="q-box">
        <div className="q-text">{prob.q}</div>
        <div className="calc-row">
          <input
            className="calc-input"
            type="number"
            value={val}
            onChange={e => setVal(e.target.value)}
            placeholder="?"
            style={{ width: 90 }}
            disabled={!!result}
          />
          <span className="calc-label">{prob.unit}</span>
          {!result && <button className="check-btn" onClick={check}>Check</button>}
        </div>
        {result && (
          <div className={`feedback ${result.ok ? 'ok' : 'fail'}`}>
            {result.ok ? '✅ Correct! Great work!' : `❌ The answer is ${prob.ans}${prob.unit}`}
          </div>
        )}
        <button className="next-btn" style={{ background: '#1a7fe8', display: 'block', marginTop: '.6rem' }} onClick={next}>
          New problem →
        </button>
      </div>
    </div>
  );
}
