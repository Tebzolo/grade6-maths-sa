import QuizEngine from './QuizEngine';
import { questions, extraDecimalQuestions } from '../data/questions';
const ALL = [...questions.decimals, ...extraDecimalQuestions];
export default function DecimalsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fdf0ec' }}>🔢</div>
        <div>
          <div className="card-title">Decimal Fractions <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · decimals, Rands & cents</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Line up the decimal points when adding or subtracting decimals!</div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
