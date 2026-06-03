import QuizEngine from './QuizEngine';
import AreaPerimeter from './AreaPerimeter';
import { questions } from '../data/questions';

const ShapeVisuals = () => {
  const octPts = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i - Math.PI / 8;
    return [100 + 48 * Math.cos(a), 65 + 48 * Math.sin(a)];
  });

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '.5rem 0 .75rem', justifyContent: 'center' }}>
      <svg viewBox="0 0 120 100" style={{ width: 110 }}>
        <polygon points="60,8 8,92 112,92" fill="#e6f7ee" stroke="#18a45a" strokeWidth="2.5" />
        <text x="60" y="112" textAnchor="middle" fontSize="10" fill="#555">Triangle</text>
      </svg>
      <svg viewBox="0 0 120 100" style={{ width: 110 }}>
        <rect x="12" y="20" width="96" height="60" fill="#e8f3fd" stroke="#1a7fe8" strokeWidth="2.5" rx="3" />
        <text x="60" y="100" textAnchor="middle" fontSize="10" fill="#555">Rectangle</text>
      </svg>
      <svg viewBox="0 0 130 130" style={{ width: 110 }}>
        <polygon points={octPts.map(p => p.join(',')).join(' ')} fill="#f9ebfc" stroke="#b318a4" strokeWidth="2.5" />
        <text x="100" y="125" textAnchor="middle" fontSize="10" fill="#555">Octagon</text>
      </svg>
    </div>
  );
};

export default function GeometrySection({ score, onAnswer }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-icon" style={{ background: '#e6f7ee' }}>📐</div>
          <div>
            <div className="card-title">2D Shapes & Angles <span className="badge-caps">CAPS</span></div>
            <div className="card-sub">Polygons, symmetry, angles and 3D objects</div>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>
        <ShapeVisuals />
        <QuizEngine questions={questions.geometry} onAnswer={onAnswer} />
      </div>
      <AreaPerimeter />
    </>
  );
}
