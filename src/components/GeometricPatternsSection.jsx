import QuizEngine from './QuizEngine';
import { geometricPatternQuestions, extraGeometricPatternQuestions } from '../data/questions';
const ALL = [...geometricPatternQuestions, ...extraGeometricPatternQuestions];
export default function GeometricPatternsSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f9ebfc' }}>🔷</div>
        <div>
          <div className="card-title">Geometric Patterns <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · tiles · matchsticks · sequences</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Draw the next shape if you get stuck — visual patterns are easier to see!</div>
      <svg viewBox="0 0 300 80" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 0 .75rem' }}>
        {[0,1,2,3].map(step => {
          const x = step * 72 + 10;
          const count = step + 1;
          return Array.from({ length: count }).map((_,row) =>
            Array.from({ length: count-row }).map((_,col) => (
              <rect key={`${step}-${row}-${col}`} x={x+col*16+row*8} y={20+row*16} width={14} height={14} rx="2"
                fill={['#1a7fe8','#18a45a','#e8541a','#b318a4'][step]} opacity="0.8"/>
            ))
          );
        })}
        {[1,2,3,4].map((n,i) => (
          <text key={i} x={i*72+24} y={75} textAnchor="middle" fontSize="11" fill="#555" fontWeight="bold">{n}</text>
        ))}
      </svg>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
