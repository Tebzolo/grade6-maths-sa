import QuizEngine from './QuizEngine';
import { questions } from '../data/questions';

export default function PatternsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>🔷</div>
        <div>
          <div className="card-title">Patterns & Algebra <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">Number sequences, input-output tables, rules</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Look for what is added, subtracted or multiplied each time to find the rule!</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px', margin: '.5rem 0 .75rem' }}>
        {[['IN','OUT'],['2','6'],['5','15'],['8','24']].map((row, i) => (
          <div key={i} style={{ display: 'contents' }}>
            {row.map((cell, j) => (
              <div key={j} style={{
                padding: '.35rem', textAlign: 'center', fontSize: '.8rem', fontWeight: i === 0 ? 800 : 600,
                background: i === 0 ? '#1a7fe8' : j === 0 ? '#e8f3fd' : '#e6f7ee',
                color: i === 0 ? '#fff' : j === 0 ? '#0c447c' : '#085041',
                borderRadius: '6px',
              }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
      <QuizEngine questions={questions.patterns} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
