import QuizEngine from './QuizEngine';
import { commonFactorQuestions, extraCommonFactorQuestions } from '../data/questions';
const ALL = [...commonFactorQuestions, ...extraCommonFactorQuestions];
export default function CommonFactorsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>🔗</div>
        <div>
          <div className="card-title">Common Factors & HCF <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · HCF · word problems</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">List ALL factors of each number first, then find the ones they SHARE!</div>
      <div style={{ background: '#e6f7ee', borderRadius: '10px', padding: '.75rem', marginBottom: '.75rem' }}>
        <div style={{ fontSize: '.78rem', fontWeight: 800, color: '#0d5c33', marginBottom: '.4rem' }}>💡 HCF of 12 and 18:</div>
        <div style={{ fontSize: '.78rem', lineHeight: 1.7, color: '#333' }}>
          Factors of 12: <strong>1, 2, 3, 4, 6, 12</strong><br />
          Factors of 18: <strong>1, 2, 3, 6, 9, 18</strong><br />
          Common: <span style={{ color: '#1a7fe8', fontWeight: 800 }}>1, 2, 3, 6</span> → HCF = <span style={{ color: '#e8541a', fontWeight: 800 }}>6</span>
        </div>
      </div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
