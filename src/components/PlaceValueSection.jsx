import QuizEngine from './QuizEngine';
import { placeValueQuestions, extraPlaceValueQuestions } from '../data/questions';

const ALL = [...placeValueQuestions, ...extraPlaceValueQuestions];

export default function PlaceValueSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#e8f3fd' }}>🔢</div>
        <div>
          <div className="card-title">Place Value <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">{ALL.length} questions · 9-digit numbers · expanded form</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">South Africa CAPS: Numbers up to 999 999 999 (nine digits)</div>
      <div style={{ overflowX: 'auto', marginBottom: '.75rem' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: '.7rem', fontWeight: 700, width: '100%', minWidth: 400 }}>
          <thead><tr>
            {['100M','10M','M','100K','10K','K','100s','10s','1s'].map((h,i) => (
              <td key={i} style={{ background: '#1a7fe8', color: '#fff', padding: '4px 5px', textAlign: 'center', border: '1px solid #b5d4f4' }}>{h}</td>
            ))}
          </tr></thead>
          <tbody><tr>
            {['3','4','5','6','7','8','9','1','2'].map((d,i) => (
              <td key={i} style={{ background: i%2===0?'#e8f3fd':'#f0f8ff', textAlign: 'center', padding: '6px 4px', fontSize: '.95rem', fontWeight: 800, border: '1px solid #b5d4f4', color: '#0c447c' }}>{d}</td>
            ))}
          </tr></tbody>
        </table>
        <div style={{ fontSize: '.7rem', color: '#666', marginTop: '4px' }}>Example: 345 678 912</div>
      </div>
      <QuizEngine questions={ALL} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
