import QuizEngine from './QuizEngine';
import BarChart from './BarChart';
import { questions, extraDataQuestions } from '../data/questions';
const ALL = [...questions.data, ...extraDataQuestions];
export default function DataSection({ score, onAnswer, lang }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#fff7e6' }}>📊</div>
          <div>
            <div className="card-title">Data Handling <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">{ALL.length} questions · mean, median, mode, range</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">Mode = most common · Median = middle · Mean = sum ÷ count · Range = max − min</div>
        <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
      </div>
      <BarChart />
    </>
  );
}
