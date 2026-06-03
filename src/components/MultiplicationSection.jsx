import QuizEngine from './QuizEngine';
import { multiplicationQuestions, extraMultiplicationQuestions } from '../data/questions';
const ALL = [...multiplicationQuestions, ...extraMultiplicationQuestions];
export default function MultiplicationSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f9ebfc' }}>✖️</div>
        <div>
          <div className="card-title">Multiplication <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · 3-digit × 2-digit · word problems</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Break it down: 345 × 12 = (345 × 10) + (345 × 2) = 3 450 + 690 = 4 140</div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
