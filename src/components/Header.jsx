import learnerImg from '../learner.png';

export default function Header({ totalAnswered, totalCorrect, lang, currentLang, onLangChange }) {
  const pct = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'zu', label: 'ZU' },
    { code: 'af', label: 'AF' },
    { code: 'st', label: 'ST' },
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1a7fe8 0%, #18a45a 100%)',
      padding: '1.25rem 1.25rem .9rem',
      borderRadius: '0 0 2rem 2rem',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 130,
    }}>

      {/* Faded learner photo on the right */}
      <img
        src={learnerImg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          height: '130px',
          width: 'auto',
          objectFit: 'cover',
          objectPosition: 'top',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
          mixBlendMode: 'luminosity',
          opacity: 0.45,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '.7rem', opacity: .75, marginBottom: '.15rem', fontWeight: 700, letterSpacing: '.06em' }}>
              GRADE 6 · CAPS · SOUTH AFRICA 🇿🇦
            </div>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.75rem', lineHeight: 1.1, marginBottom: '.2rem' }}>
              {lang.title}
            </h1>
            <p style={{ fontSize: '.8rem', opacity: .85, marginBottom: '.75rem', maxWidth: '65%' }}>
              {lang.subtitle}
            </p>
          </div>
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginLeft: '.5rem' }}>
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code)}
                style={{
                  padding: '.25rem .45rem', borderRadius: '6px', border: 'none',
                  background: currentLang === l.code ? '#fff' : 'rgba(255,255,255,0.25)',
                  color: currentLang === l.code ? '#1a7fe8' : '#fff',
                  fontWeight: 800, fontSize: '.7rem', cursor: 'pointer',
                  fontFamily: "'Nunito',sans-serif",
                }}
              >{l.label}</button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{
            background: '#fff', height: '100%', borderRadius: '999px',
            width: pct + '%', transition: 'width .5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', marginTop: '.3rem', opacity: .9 }}>
          <span>{totalCorrect} correct / {totalAnswered} answered</span>
          {totalAnswered > 0 && <span style={{ fontWeight: 800 }}>{pct}% ⭐</span>}
        </div>
      </div>
    </header>
  );
}
