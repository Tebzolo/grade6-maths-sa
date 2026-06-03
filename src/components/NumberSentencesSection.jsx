import QuizEngine from './QuizEngine';
import { numberSentenceQuestions, extraNumberSentenceQuestions } from '../data/questions';
const ALL = [...numberSentenceQuestions, ...extraNumberSentenceQuestions];
export default function NumberSentencesSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fff7e6' }}>🔣</div>
        <div>
          <div className="card-title">Number Sentences <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · find n · equations</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">To find n: use the opposite operation. n + 5 = 12 → n = 12 − 5 = 7</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '6px', marginBottom: '.75rem' }}>
        {[
          { ex: 'n + 8 = 20', sol: 'n = 20 - 8 = 12', op: '➕' },
          { ex: 'n - 5 = 14', sol: 'n = 14 + 5 = 19', op: '➖' },
          { ex: '3 × n = 24', sol: 'n = 24 ÷ 3 = 8', op: '✖️' },
          { ex: 'n ÷ 4 = 7',  sol: 'n = 7 × 4 = 28', op: '➗' },
        ].map(item => (
          <div key={item.ex} style={{ background: '#fff7e6', borderRadius: '8px', padding: '.5rem .65rem', border: '1px solid #f5c96a' }}>
            <div style={{ fontSize: '.82rem', fontWeight: 800, color: '#7a4400' }}>{item.op} {item.ex}</div>
            <div style={{ fontSize: '.75rem', color: '#c8860a', marginTop: '2px', fontFamily: 'monospace' }}>{item.sol}</div>
          </div>
        ))}
      </div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
