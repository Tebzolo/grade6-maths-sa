import QuizEngine from './QuizEngine';
import LongDivision from './LongDivision';
import { divisionQuestions, extraDivisionQuestions } from '../data/questions';
const ALL = [...divisionQuestions, ...extraDivisionQuestions];
export default function DivisionSection({ score, onAnswer, lang }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#e8f3fd' }}>➗</div>
          <div>
            <div className="card-title">Division <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">{ALL.length} questions · remainders · word problems</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">Division is the inverse of multiplication — use times tables to help!</div>
        <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
      </div>
      <LongDivision lang={lang} />
    </>
  );
}
