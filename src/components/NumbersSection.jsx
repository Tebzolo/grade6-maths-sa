import QuizEngine from './QuizEngine';
import FactorGrid from './FactorGrid';
import LongDivision from './LongDivision';
import { questions } from '../data/questions';

export default function NumbersSection({ score, onAnswer }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#fdf0ec' }}>🔢</div>
          <div>
            <div className="card-title">Whole Numbers <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">Place value, rounding, prime numbers & powers</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">South African CAPS: Work with numbers up to 999 999 999 (9 digits)</div>
        <QuizEngine questions={questions.numbers} onAnswer={onAnswer} />
      </div>
      <FactorGrid />
      <LongDivision />
    </>
  );
}
