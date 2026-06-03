import QuizEngine from './QuizEngine';
import Percentages from './Percentages';
import { questions } from '../data/questions';

export default function FractionsSection({ score, onAnswer }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#e8f3fd' }}>½</div>
          <div>
            <div className="card-title">Fractions <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">Add, subtract, multiply and compare fractions</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">Remember: to add fractions, first find the common denominator!</div>
        <QuizEngine questions={questions.fractions} onAnswer={onAnswer} />
      </div>
      <Percentages />
    </>
  );
}
