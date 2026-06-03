import QuizEngine from './QuizEngine';
import { additionQuestions, extraAdditionQuestions } from '../data/questions';
const ALL = [...additionQuestions, ...extraAdditionQuestions];
export default function AdditionSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>➕</div>
        <div>
          <div className="card-title">Addition <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · column addition · word problems</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Always start from the units column and carry over to the next column!</div>
      <div style={{ background: '#e6f7ee', borderRadius: '10px', padding: '.75rem', marginBottom: '.75rem', fontFamily: 'monospace', fontSize: '.9rem', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 800, fontFamily: 'Nunito,sans-serif', fontSize: '.8rem', marginBottom: '.25rem' }}>💡 Example:</div>
        &nbsp;&nbsp;2 3 4 5 6<br />+&nbsp;1 8 7 9 4<br />
        <span style={{ borderTop: '2px solid #18a45a', display: 'block', paddingTop: '2px', fontWeight: 800, color: '#0d5c33' }}>&nbsp;&nbsp;4 2 2 5 0</span>
      </div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
