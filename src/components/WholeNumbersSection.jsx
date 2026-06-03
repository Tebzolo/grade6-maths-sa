import QuizEngine from './QuizEngine';
import { wholeNumberQuestions } from '../data/questions';

export default function WholeNumbersSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#fdf0ec' }}>🔟</div>
        <div>
          <div className="card-title">Whole Numbers <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">Properties, ordering, rounding and word problems</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Whole numbers include 0, 1, 2, 3 … — they have no fractions or decimals!</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px', marginBottom: '.75rem' }}>
        {[
          { label: 'Rounding', icon: '🔄', eg: 'to nearest 10 / 100 / 1 000' },
          { label: 'Comparing', icon: '⚖️', eg: '< = > between numbers' },
          { label: 'Ordering', icon: '📋', eg: 'ascending & descending' },
        ].map(item => (
          <div key={item.label} style={{ background: '#fdf0ec', borderRadius: '10px', padding: '.5rem .4rem', textAlign: 'center', border: '1px solid #f5c96a' }}>
            <div style={{ fontSize: '1.2rem' }}>{item.icon}</div>
            <div style={{ fontSize: '.75rem', fontWeight: 800 }}>{item.label}</div>
            <div style={{ fontSize: '.65rem', color: '#666', marginTop: '2px' }}>{item.eg}</div>
          </div>
        ))}
      </div>
      <QuizEngine questions={wholeNumberQuestions} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
