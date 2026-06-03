import QuizEngine from './QuizEngine';
import { questions } from '../data/questions';

export default function MeasureSection({ score, onAnswer, lang }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: '#f9ebfc' }}>📏</div>
        <div>
          <div className="card-title">Measurement <span className="badge-caps">CAPS</span></div>
          <div className="card-sub">Units, conversion, time and temperature</div>
        </div>
        <div className="score-badge">⭐ {score}</div>
      </div>
      <div className="tip">Key conversions: 1 km = 1 000 m · 1 kg = 1 000 g · 1 ℓ = 1 000 mℓ</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        margin: '.5rem 0 .75rem',
        textAlign: 'center',
      }}>
        {[
          { label: 'Length', icon: '📏', eg: 'km → m → cm → mm' },
          { label: 'Mass', icon: '⚖️', eg: 'kg → g → mg' },
          { label: 'Capacity', icon: '🧴', eg: 'kℓ → ℓ → mℓ' },
        ].map(item => (
          <div key={item.label} style={{
            background: '#f7f3ee',
            borderRadius: '10px',
            padding: '.6rem .4rem',
            border: '1px solid #e0d8cf',
          }}>
            <div style={{ fontSize: '1.3rem' }}>{item.icon}</div>
            <div style={{ fontSize: '.78rem', fontWeight: 700 }}>{item.label}</div>
            <div style={{ fontSize: '.68rem', color: '#666', marginTop: '2px' }}>{item.eg}</div>
          </div>
        ))}
      </div>
      <QuizEngine questions={questions.measure} onAnswer={onAnswer} lang={lang} />
    </div>
  );
}
