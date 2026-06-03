import { useState, useEffect, useRef } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizEngine({ questions, onAnswer, lang, timerEnabled = true }) {
  const [order, setOrder] = useState(() => shuffle(questions.map((_, i) => i)));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [optOrder, setOptOrder] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);

  const t = lang;
  const current = questions[order[idx]];

  useEffect(() => {
    if (current) {
      setOptOrder(shuffle(current.opts.map((_, i) => i)));
      setAnswered(false);
      setSelectedOpt(null);
      setTimeLeft(20);
    }
  }, [idx, order]);

  useEffect(() => {
    if (!timerEnabled || answered) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setAnswered(true);
          setSelectedOpt('__timeout__');
          onAnswer(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, answered, timerEnabled]);

  if (idx >= questions.length) {
    return (
      <div className="q-box">
        <div className="complete-msg">🎉 Section complete! You answered all questions. Well done!</div>
        <button className="next-btn" onClick={() => { setOrder(shuffle(questions.map((_, i) => i))); setIdx(0); }}>
          Restart section ↺
        </button>
      </div>
    );
  }

  const correctOpt = current.opts[current.ans];
  const timerPct = (timeLeft / 20) * 100;
  const timerColor = timeLeft > 10 ? '#18a45a' : timeLeft > 5 ? '#c8860a' : '#e8541a';

  const handleSelect = (optText) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelectedOpt(optText);
    setAnswered(true);
    onAnswer(optText === correctOpt);
  };

  const getOptClass = (optText) => {
    if (!answered) return 'opt';
    if (optText === correctOpt) return 'opt correct';
    if (optText === selectedOpt) return 'opt wrong';
    return 'opt';
  };

  return (
    <div className="q-box">
      {timerEnabled && (
        <div style={{ marginBottom: '.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', fontWeight: 700, marginBottom: '4px' }}>
            <span style={{ color: timerColor }}>⏱ {t.timer}: {timeLeft}s</span>
            <span style={{ color: '#999' }}>{idx + 1} / {questions.length}</span>
          </div>
          <div style={{ background: '#eee', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: timerPct + '%', background: timerColor, height: '100%', borderRadius: '999px', transition: 'width 1s linear, background .3s' }} />
          </div>
        </div>
      )}
      <div className="q-text">{current.q}</div>
      <div className="options">
        {optOrder.map(i => (
          <button key={i} className={getOptClass(current.opts[i])} onClick={() => handleSelect(current.opts[i])} disabled={answered}>
            {current.opts[i]}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`feedback ${selectedOpt === correctOpt ? 'ok' : 'fail'}`}>
          {selectedOpt === '__timeout__'
            ? `⏰ Time's up! Answer: ${correctOpt}`
            : selectedOpt === correctOpt
              ? `✅ ${t.correct}`
              : `❌ ${t.wrong} ${correctOpt}`}
        </div>
      )}
      {answered && (
        <button className="next-btn" onClick={() => setIdx(i => i + 1)}>{t.next}</button>
      )}
    </div>
  );
}
