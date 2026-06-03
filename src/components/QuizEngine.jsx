import { useState, useEffect } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizEngine({ questions, onAnswer, children }) {
  const [order, setOrder] = useState(() => shuffle(questions.map((_, i) => i)));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [optOrder, setOptOrder] = useState([]);

  const current = questions[order[idx]];

  useEffect(() => {
    if (current) {
      setOptOrder(shuffle(current.opts.map((_, i) => i)));
      setAnswered(false);
      setSelectedOpt(null);
    }
  }, [idx, order]);

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

  const handleSelect = (optText) => {
    if (answered) return;
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
      <div className="q-text">{current.q}</div>
      {children}
      <div className="options">
        {optOrder.map(i => (
          <button
            key={i}
            className={getOptClass(current.opts[i])}
            onClick={() => handleSelect(current.opts[i])}
            disabled={answered}
          >
            {current.opts[i]}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`feedback ${selectedOpt === correctOpt ? 'ok' : 'fail'}`}>
          {selectedOpt === correctOpt
            ? '✅ Correct! Well done!'
            : `❌ The correct answer is: ${correctOpt}`}
        </div>
      )}
      {answered && (
        <button className="next-btn" onClick={() => setIdx(i => i + 1)}>
          Next question →
        </button>
      )}
    </div>
  );
}
