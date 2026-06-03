import QuizEngine from './QuizEngine';
import { questions } from '../data/questions';

export default function DecimalsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fdf0ec' }}>🔢</div>
        <div>
          <div className="card-title">Decimal Fractions <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">Add, subtract, multiply decimals and use Rands</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Line up the decimal points when adding or subtracting decimals!</div>
      <div style={{
        background: '#fdf0ec', borderRadius: '10px', padding: '.75rem',
        marginBottom: '.75rem', fontSize: '.85rem',
      }}>
        <div style={{ fontWeight: 800, marginBottom: '.35rem' }}>💡 Example: R45.60 + R12.35</div>
        <div style={{ fontFamily: 'monospace', fontSize: '.9rem', lineHeight: 1.6 }}>
          &nbsp;&nbsp;4 5 . 6 0<br />
          + 1 2 . 3 5<br />
          <span style={{ borderTop: '1px solid #e8541a', display: 'block', paddingTop: '2px' }}>
          &nbsp;&nbsp;5 7 . 9 5
          </span>
        </div>
      </div>
      <QuizEngine questions={questions.decimals} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
