import QuizEngine from './QuizEngine';
import BarChart from './BarChart';
import { questions } from '../data/questions';

export default function DataSection({ score, onAnswer, lang }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#fff7e6' }}>📊</div>
          <div>
            <div className="card-title">Data Handling <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">Mean, median, mode, range and graphs</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <div className="tip">Mode = most common · Median = middle value · Mean = sum ÷ count · Range = max − min</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          margin: '.5rem 0 .75rem',
        }}>
          {[
            { name: 'Mean', desc: 'Add all values, then divide by how many there are', color: '#e8f3fd', border: '#1a7fe8' },
            { name: 'Median', desc: 'The middle value when data is sorted in order', color: '#e6f7ee', border: '#18a45a' },
            { name: 'Mode', desc: 'The value that appears most often in the data', color: '#fdf0ec', border: '#e8541a' },
            { name: 'Range', desc: 'Largest value minus smallest value', color: '#f9ebfc', border: '#b318a4' },
          ].map(item => (
            <div key={item.name} style={{
              background: item.color,
              borderRadius: '10px',
              padding: '.6rem .75rem',
              borderLeft: `3px solid ${item.border}`,
            }}>
              <div style={{ fontSize: '.85rem', fontWeight: 800 }}>{item.name}</div>
              <div style={{ fontSize: '.75rem', color: '#555', marginTop: '2px', lineHeight: 1.3 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <QuizEngine questions={questions.data} onAnswer={onAnswer} lang={lang} />
      </div>
      <BarChart />
    </>
  );
}
