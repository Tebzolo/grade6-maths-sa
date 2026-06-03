export default function Header({ totalAnswered, totalCorrect }) {
  const pct = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1a7fe8 0%, #18a45a 100%)',
      padding: '1.5rem 1.5rem 1rem',
      borderRadius: '0 0 2rem 2rem',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ fontSize: '.72rem', opacity: .75, marginBottom: '.2rem', fontWeight: 700, letterSpacing: '.06em' }}>
        GRADE 6 · CAPS CURRICULUM · SOUTH AFRICA 🇿🇦
      </div>
      <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.9rem', lineHeight: 1.1, marginBottom: '.25rem' }}>
        Maths Explorer
      </h1>
      <p style={{ fontSize: '.875rem', opacity: .85, marginBottom: '.85rem' }}>
        Practise, learn, and master Grade 6 Maths
      </p>
      <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
        <div style={{
          background: '#fff',
          height: '100%',
          borderRadius: '999px',
          width: pct + '%',
          transition: 'width .5s ease',
        }} />
      </div>
      <div style={{ fontSize: '.75rem', marginTop: '.35rem', opacity: .85 }}>
        {totalCorrect} correct from {totalAnswered} answered
        {totalAnswered > 0 && ` (${pct}%)`}
      </div>
    </header>
  );
}
