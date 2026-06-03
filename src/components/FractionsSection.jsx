import QuizEngine from './QuizEngine';
import Percentages from './Percentages';
import { questions, extraFractionQuestions } from '../data/questions';
const ALL = [...questions.fractions, ...extraFractionQuestions];
export default function FractionsSection({ score, onAnswer, lang }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#e8f3fd' }}>½</div>
          <div>
            <div className="card-title">Fractions <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">{ALL.length} questions · add, subtract, multiply, compare</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">To add fractions, first find the common denominator!</div>
        <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
      </div>
      <Percentages />
    </>
  );
}
