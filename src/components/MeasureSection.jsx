import QuizEngine from './QuizEngine';
import { questions, extraMeasureQuestions } from '../data/questions';
const ALL = [...questions.measure, ...extraMeasureQuestions];
export default function MeasureSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f9ebfc' }}>📏</div>
        <div>
          <div className="card-title">Measurement <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · units, time, temperature, area</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Key conversions: 1 km = 1 000 m · 1 kg = 1 000 g · 1 ℓ = 1 000 mℓ</div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
