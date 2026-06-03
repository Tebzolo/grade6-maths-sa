import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NumbersSection from './components/NumbersSection';
import FractionsSection from './components/FractionsSection';
import GeometrySection from './components/GeometrySection';
import MeasureSection from './components/MeasureSection';
import DataSection from './components/DataSection';
import PatternsSection from './components/PatternsSection';
import DecimalsSection from './components/DecimalsSection';
import PlaceValueSection from './components/PlaceValueSection';
import WholeNumbersSection from './components/WholeNumbersSection';
import AdditionSection from './components/AdditionSection';
import SubtractionSection from './components/SubtractionSection';
import MultiplicationSection from './components/MultiplicationSection';
import DivisionSection from './components/DivisionSection';
import NumberSentencesSection from './components/NumberSentencesSection';
import NumericPatternsSection from './components/NumericPatternsSection';
import GeometricPatternsSection from './components/GeometricPatternsSection';
import CommonFactorsSection from './components/CommonFactorsSection';
import Badges from './components/Badges';
import Leaderboard from './components/Leaderboard';
import BadgeToast from './components/BadgeToast';
import Credits from './components/Credits';
import InstallPrompt from './components/InstallPrompt';
import TabNav from './components/TabNav';
import { badges, translations } from './data/questions';
import './App.css';

const SECTIONS = [
  'placevalue','wholenumbers','addition','subtraction','multiplication','division',
  'numbers','fractions','decimals','numbersentences','commonfactors',
  'numericpatterns','geometricpatterns','patterns','geometry','measure','data',
];

const GROUPS = [
  {
    label: '📐 Operations',
    tabs: [
      { id: 'placevalue',     label: 'Place Value',    color: '#1a7fe8' },
      { id: 'wholenumbers',   label: 'Whole Numbers',  color: '#0a8a8a' },
      { id: 'addition',       label: 'Addition',       color: '#18a45a' },
      { id: 'subtraction',    label: 'Subtraction',    color: '#e8541a' },
      { id: 'multiplication', label: 'Multiplication', color: '#b318a4' },
      { id: 'division',       label: 'Division',       color: '#c8860a' },
    ],
  },
  {
    label: '🔢 Number Concepts',
    tabs: [
      { id: 'numbers',         label: 'Numbers',         color: '#e8541a' },
      { id: 'fractions',       label: 'Fractions',       color: '#1a7fe8' },
      { id: 'decimals',        label: 'Decimals',        color: '#8a3de8' },
      { id: 'numbersentences', label: 'Num Sentences',   color: '#c8860a' },
      { id: 'commonfactors',   label: 'Common Factors',  color: '#18a45a' },
    ],
  },
  {
    label: '🔷 Patterns & Space',
    tabs: [
      { id: 'numericpatterns',   label: 'Numeric Patterns',   color: '#18a45a' },
      { id: 'geometricpatterns', label: 'Geometric Patterns', color: '#b318a4' },
      { id: 'patterns',          label: 'Algebra',            color: '#0a8a8a' },
      { id: 'geometry',          label: 'Geometry',           color: '#18a45a' },
      { id: 'measure',           label: 'Measurement',        color: '#b318a4' },
      { id: 'data',              label: 'Data',               color: '#c8860a' },
    ],
  },
];

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
      [520,620,780,920].forEach((f,i) => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.frequency.value = f;
        g2.gain.setValueAtTime(0.12, ctx.currentTime + i*0.1);
        g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i*0.1 + 0.2);
        o2.start(ctx.currentTime + i*0.1);
        o2.stop(ctx.currentTime + i*0.1 + 0.2);
      });
    }
  } catch {}
}

const initScores   = () => SECTIONS.reduce((a,s) => ({...a,[s]:0}), {});
const initAnswered = () => SECTIONS.reduce((a,s) => ({...a,[s]:0}), {});

export default function App() {
  const [activeTab,    setActiveTab]    = useState('placevalue');
  const [scores,       setScores]       = useState(initScores);
  const [answered,     setAnswered]     = useState(initAnswered);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [toastBadge,   setToastBadge]   = useState(null);
  const [langCode,     setLangCode]     = useState('en');
  const [soundOn,      setSoundOn]      = useState(true);
  const [isOffline,    setIsOffline]    = useState(!navigator.onLine);
  const [streak,       setStreak]       = useState(0);

  const lang = translations[langCode];

  useEffect(() => {
    const on  = () => setIsOffline(false);
    const off = () => setIsOffline(true);
    window.addEventListener('online',  on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  const totalAnswered = Object.values(answered).reduce((a,b) => a+b, 0);
  const totalCorrect  = Object.values(scores).reduce((a,b)   => a+b, 0);

  const checkBadges = useCallback((totalS, totalA, currentStreak, maxSectionScore) => {
    badges.forEach(b => {
      setEarnedBadges(prev => {
        if (prev.includes(b.id)) return prev;
        if (b.condition(totalS, totalA, currentStreak, maxSectionScore)) {
          setToastBadge(b);
          if (soundOn) playSound('badge');
          return [...prev, b.id];
        }
        return prev;
      });
    });
  }, [soundOn]);

  const addScore = useCallback((section, correct) => {
    if (soundOn) playSound(correct ? 'correct' : 'wrong');
    setStreak(prev => {
      const newStreak = correct ? prev + 1 : 0;
      setAnswered(prevA => {
        const nextA = {...prevA, [section]: prevA[section]+1};
        setScores(prevS => {
          const nextS = correct ? {...prevS, [section]: prevS[section]+1} : prevS;
          const totalS = Object.values(nextS).reduce((a,b)=>a+b,0);
          const totalA = Object.values(nextA).reduce((a,b)=>a+b,0);
          const maxSec = Math.max(...Object.values(nextS));
          checkBadges(totalS, totalA, newStreak, maxSec);
          return nextS;
        });
        return nextA;
      });
      return newStreak;
    });
  }, [soundOn, checkBadges]);

  const sp = (id) => ({ score: scores[id], onAnswer: (c) => addScore(id, c), lang });

  return (
    <div className="app">
      <Header
        totalAnswered={totalAnswered}
        totalCorrect={totalCorrect}
        lang={lang}
        currentLang={langCode}
        onLangChange={setLangCode}
      />

      {/* Grouped tabs — all visible, wrapping */}
      {GROUPS.map(group => (
        <div key={group.label} style={{ borderBottom: '1px solid #e0d8cf' }}>
          <div style={{
            fontSize: '.65rem', fontWeight: 800, color: '#fff',
            padding: '.2rem .75rem', background: '#444',
            letterSpacing: '.05em',
          }}>
            {group.label}
          </div>
          <TabNav
            tabs={group.tabs}
            activeTab={activeTab}
            onTab={setActiveTab}
          />
        </div>
      ))}

      <main className="content">
        {isOffline && (
          <div className="offline-banner">📵 You are offline — app still works!</div>
        )}

        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'.5rem' }}>
          <button
            onClick={() => setSoundOn(s => !s)}
            style={{
              padding: '.3rem .75rem', borderRadius: '999px',
              border: '1.5px solid #e0d8cf',
              background: soundOn ? '#e6f7ee' : '#f7f3ee',
              cursor: 'pointer', fontFamily: "'Nunito',sans-serif",
              fontSize: '.8rem', fontWeight: 700,
            }}
          >{soundOn ? '🔊 Sound ON' : '🔇 Sound OFF'}</button>
        </div>

        <Credits />
        <Leaderboard totalCorrect={totalCorrect} totalAnswered={totalAnswered} lang={lang} />
        <Badges earnedBadges={earnedBadges} lang={lang} />

        {activeTab === 'placevalue'        && <PlaceValueSection        {...sp('placevalue')} />}
        {activeTab === 'wholenumbers'      && <WholeNumbersSection      {...sp('wholenumbers')} />}
        {activeTab === 'addition'          && <AdditionSection          {...sp('addition')} />}
        {activeTab === 'subtraction'       && <SubtractionSection       {...sp('subtraction')} />}
        {activeTab === 'multiplication'    && <MultiplicationSection    {...sp('multiplication')} />}
        {activeTab === 'division'          && <DivisionSection          {...sp('division')} />}
        {activeTab === 'numbers'           && <NumbersSection           {...sp('numbers')} />}
        {activeTab === 'fractions'         && <FractionsSection         {...sp('fractions')} />}
        {activeTab === 'decimals'          && <DecimalsSection          {...sp('decimals')} />}
        {activeTab === 'numbersentences'   && <NumberSentencesSection   {...sp('numbersentences')} />}
        {activeTab === 'commonfactors'     && <CommonFactorsSection     {...sp('commonfactors')} />}
        {activeTab === 'numericpatterns'   && <NumericPatternsSection   {...sp('numericpatterns')} />}
        {activeTab === 'geometricpatterns' && <GeometricPatternsSection {...sp('geometricpatterns')} />}
        {activeTab === 'patterns'          && <PatternsSection          {...sp('patterns')} />}
        {activeTab === 'geometry'          && <GeometrySection          {...sp('geometry')} />}
        {activeTab === 'measure'           && <MeasureSection           {...sp('measure')} />}
        {activeTab === 'data'              && <DataSection              {...sp('data')} />}
      </main>

      {toastBadge && <BadgeToast badge={toastBadge} onDone={() => setToastBadge(null)} />}
      <InstallPrompt />
    </div>
  );
}
