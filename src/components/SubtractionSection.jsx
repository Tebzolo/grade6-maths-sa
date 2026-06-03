import QuizEngine from './QuizEngine';
import { subtractionQuestions, extraSubtractionQuestions } from '../data/questions';
const ALL = [...subtractionQuestions, ...extraSubtractionQuestions];
export default function SubtractionSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fdf0ec' }}>➖</div>
        <div>
          <div className="card-title">Subtraction <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · borrowing · word problems</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">When you cannot subtract, borrow 10 from the next column to the left!</div>
      <div style={{ background: '#fdf0ec', borderRadius: '10px', padding: '.75rem', marginBottom: '.75rem', fontFamily: 'monospace', fontSize: '.9rem', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 800, fontFamily: 'Nunito,sans-serif', fontSize: '.8rem', marginBottom: '.25rem' }}>💡 Example:</div>
        &nbsp;&nbsp;5 0 0 0 0<br />-&nbsp;2 3 4 5 6<br />
        <span style={{ borderTop: '2px solid #e8541a', display: 'block', paddingTop: '2px', fontWeight: 800, color: '#7a2400' }}>&nbsp;&nbsp;2 6 5 4 4</span>
      </div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
