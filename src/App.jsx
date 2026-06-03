import { useState } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import NumbersSection from './components/NumbersSection';
import FractionsSection from './components/FractionsSection';
import GeometrySection from './components/GeometrySection';
import MeasureSection from './components/MeasureSection';
import DataSection from './components/DataSection';
import './App.css';

const TABS = [
  { id: 'numbers', label: 'Numbers', color: '#e8541a' },
  { id: 'fractions', label: 'Fractions', color: '#1a7fe8' },
  { id: 'geometry', label: 'Geometry', color: '#18a45a' },
  { id: 'measure', label: 'Measurement', color: '#b318a4' },
  { id: 'data', label: 'Data', color: '#c8860a' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('numbers');
  const [scores, setScores] = useState({ numbers: 0, fractions: 0, geometry: 0, measure: 0, data: 0 });
  const [answered, setAnswered] = useState({ numbers: 0, fractions: 0, geometry: 0, measure: 0, data: 0 });

  const addScore = (section, correct) => {
    setAnswered(prev => ({ ...prev, [section]: prev[section] + 1 }));
    if (correct) setScores(prev => ({ ...prev, [section]: prev[section] + 1 }));
  };

  const totalAnswered = Object.values(answered).reduce((a, b) => a + b, 0);
  const totalCorrect = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="app">
      <Header totalAnswered={totalAnswered} totalCorrect={totalCorrect} />
      <TabNav tabs={TABS} activeTab={activeTab} onTab={setActiveTab} />
      <main className="content">
        {activeTab === 'numbers' && <NumbersSection score={scores.numbers} onAnswer={(c) => addScore('numbers', c)} />}
        {activeTab === 'fractions' && <FractionsSection score={scores.fractions} onAnswer={(c) => addScore('fractions', c)} />}
        {activeTab === 'geometry' && <GeometrySection score={scores.geometry} onAnswer={(c) => addScore('geometry', c)} />}
        {activeTab === 'measure' && <MeasureSection score={scores.measure} onAnswer={(c) => addScore('measure', c)} />}
        {activeTab === 'data' && <DataSection score={scores.data} onAnswer={(c) => addScore('data', c)} />}
      </main>
    </div>
  );
}
