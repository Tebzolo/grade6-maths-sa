import QuizEngine from './QuizEngine';
import { numericPatternQuestions, extraNumericPatternQuestions } from '../data/questions';
const ALL = [...numericPatternQuestions, ...extraNumericPatternQuestions];
export default function NumericPatternsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e6f7ee' }}>📈</div>
        <div>
          <div className="card-title">Numeric Patterns <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · rules · nth term · sequences</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Always check 2–3 gaps between terms to confirm the rule!</div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
