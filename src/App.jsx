import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import NumbersSection from './components/NumbersSection';
import FractionsSection from './components/FractionsSection';
import GeometrySection from './components/GeometrySection';
import MeasureSection from './components/MeasureSection';
import DataSection from './components/DataSection';
import PatternsSection from './components/PatternsSection';
import DecimalsSection from './components/DecimalsSection';
import Badges from './components/Badges';
import Leaderboard from './components/Leaderboard';
import BadgeToast from './components/BadgeToast';
import { badges, translations } from './data/questions';
import './App.css';

const SECTIONS = ['numbers', 'fractions', 'geometry', 'measure', 'data', 'patterns', 'decimals'];

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type === 'correct') {
      o.frequency.setValueAtTime(520, ctx.currentTime);
      o.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      o.start(); o.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      o.frequency.setValueAtTime(220, ctx.currentTime);
      o.type = 'sawtooth';
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.start(); o.stop(ctx.currentTime + 0.25);
    } else if (type === 'badge') {
      [520, 620, 780, 920].forEach((f, i) => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.frequency.value = f;
        g2.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.1);
        g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
        o2.start(ctx.currentTime + i * 0.1);
        o2.stop(ctx.currentTime + i * 0.1 + 0.2);
      });
    }
  } catch {}
}

const initScores = () => SECTIONS.reduce((a, s) => ({ ...a, [s]: 0 }), {});
const initAnswered = () => SECTIONS.reduce((a, s) => ({ ...a, [s]: 0 }), {});

export default function App() {
  const [activeTab, setActiveTab] = useState('numbers');
  const [scores, setScores] = useState(initScores);
  const [answered, setAnswered] = useState(initAnswered);
  const [streaks, setStreaks] = useState(initScores);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [toastBadge, setToastBadge] = useState(null);
  const [langCode, setLangCode] = useState('en');
  const [soundOn, setSoundOn] = useState(true);

  const lang = translations[langCode];

  const totalAnswered = Object.values(answered).reduce((a, b) => a + b, 0);
  const totalCorrect = Object.values(scores).reduce((a, b) => a + b, 0);

  const checkBadges = useCallback((newScores, newAnswered, newStreaks) => {
    const totalS = Object.values(newScores).reduce((a, b) => a + b, 0);
    const totalA = Object.values(newAnswered).reduce((a, b) => a + b, 0);
    const maxStreak = Math.max(...Object.values(newStreaks));
    const maxSectionScore = Math.max(...Object.values(newScores));

    badges.forEach(b => {
      if (!earnedBadges.includes(b.id) && b.condition(totalS, totalA, maxStreak, maxSectionScore)) {
        setEarnedBadges(prev => [...prev, b.id]);
        setToastBadge(b);
        if (soundOn) playSound('badge');
      }
    });
  }, [earnedBadges, soundOn]);

  const addScore = useCallback((section, correct) => {
    if (soundOn) playSound(correct ? 'correct' : 'wrong');

    setAnswered(prev => {
      const next = { ...prev, [section]: prev[section] + 1 };
      setScores(prevS => {
        const nextS = correct ? { ...prevS, [section]: prevS[section] + 1 } : prevS;
        setStreaks(prevSt => {
          const nextSt = correct ? { ...prevSt, [section]: prevSt[section] + 1 } : { ...prevSt, [section]: 0 };
          checkBadges(nextS, next, nextSt);
          return nextSt;
        });
        return nextS;
      });
      return next;
    });
  }, [soundOn, checkBadges]);

  const tabs = SECTIONS.map(id => ({
    id,
    label: lang.tabs[id],
    color: {
      numbers: '#e8541a', fractions: '#1a7fe8', geometry: '#18a45a',
      measure: '#b318a4', data: '#c8860a', patterns: '#0a8a8a', decimals: '#8a3de8',
    }[id],
  }));

  const sectionProps = (id) => ({ score: scores[id], onAnswer: (c) => addScore(id, c), lang });

  return (
    <div className="app">
      <Header
        totalAnswered={totalAnswered}
        totalCorrect={totalCorrect}
        lang={lang}
        currentLang={langCode}
        onLangChange={setLangCode}
      />
      <TabNav tabs={tabs} activeTab={activeTab} onTab={setActiveTab} />
      <main className="content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '.5rem' }}>
          <button
            onClick={() => setSoundOn(s => !s)}
            style={{
              padding: '.3rem .75rem', borderRadius: '999px', border: '1.5px solid #e0d8cf',
              background: soundOn ? '#e6f7ee' : '#f7f3ee', cursor: 'pointer',
              fontFamily: "'Nunito',sans-serif", fontSize: '.8rem', fontWeight: 700,
            }}
          >
            {soundOn ? '🔊 Sound ON' : '🔇 Sound OFF'}
          </button>
        </div>
        <Leaderboard totalCorrect={totalCorrect} totalAnswered={totalAnswered} lang={lang} />
        <Badges earnedBadges={earnedBadges} lang={lang} />
        {activeTab === 'numbers' && <NumbersSection {...sectionProps('numbers')} />}
        {activeTab === 'fractions' && <FractionsSection {...sectionProps('fractions')} />}
        {activeTab === 'geometry' && <GeometrySection {...sectionProps('geometry')} />}
        {activeTab === 'measure' && <MeasureSection {...sectionProps('measure')} />}
        {activeTab === 'data' && <DataSection {...sectionProps('data')} />}
        {activeTab === 'patterns' && <PatternsSection {...sectionProps('patterns')} />}
        {activeTab === 'decimals' && <DecimalsSection {...sectionProps('decimals')} />}
      </main>
      {toastBadge && <BadgeToast badge={toastBadge} onDone={() => setToastBadge(null)} />}
    </div>
  );
}
