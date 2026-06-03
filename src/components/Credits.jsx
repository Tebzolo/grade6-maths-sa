import { useState } from 'react';

export default function Credits() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        style={{
          width: '100%',
          padding: '.6rem 1rem',
          borderRadius: '12px',
          background: '#f7f3ee',
          border: '1.5px solid #e0d8cf',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: '.9rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <span>👨‍💻 About & Credits</span>
        <span>→</span>
      </button>

      {show && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          fontFamily: "'Nunito', sans-serif",
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '400px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Header banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1a7fe8 0%, #18a45a 100%)',
              padding: '2rem 1.5rem 1.5rem',
              textAlign: 'center',
              color: '#fff',
              position: 'relative',
            }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '20px',
                background: '#fff',
                margin: '0 auto 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>
                🇿🇦
              </div>
              <h2 style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.5rem',
                margin: '0 0 .25rem',
              }}>
                Grade 6 Maths Explorer
              </h2>
              <p style={{ fontSize: '.8rem', opacity: .85, margin: 0 }}>
                CAPS-aligned · South Africa
              </p>
            </div>

            {/* Credits body */}
            <div style={{ padding: '1.5rem' }}>

              {/* Developer card */}
              <div style={{
                background: '#f0f4ff',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                borderLeft: '4px solid #1a7fe8',
              }}>
                <div style={{ fontSize: '.72rem', fontWeight: 800, color: '#1a7fe8', letterSpacing: '.06em', marginBottom: '.4rem' }}>
                  ENGINEERED BY
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a7fe8, #18a45a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '1.1rem',
                    flexShrink: 0,
                  }}>
                    TM
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>Tebogo Maruping</div>
                    <div style={{ fontSize: '.8rem', color: '#555' }}>Chief Architect</div>
                  </div>
                </div>
              </div>

              {/* Organisation card */}
              <div style={{
                background: '#e6f7ee',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                borderLeft: '4px solid #18a45a',
              }}>
                <div style={{ fontSize: '.72rem', fontWeight: 800, color: '#18a45a', letterSpacing: '.06em', marginBottom: '.4rem' }}>
                  ORGANISATION
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Contoso Tech</div>
                <div style={{ fontSize: '.8rem', color: '#555', marginTop: '2px' }}>
                  🌐{' '}
                  <a
                    href="https://www.contoso.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#18a45a', fontWeight: 700 }}
                  >
                    www.contoso.co.za
                  </a>
                </div>
              </div>

              {/* Details row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  background: '#f7f3ee', borderRadius: '10px',
                  padding: '.6rem .75rem', textAlign: 'center',
                  border: '1px solid #e0d8cf',
                }}>
                  <div style={{ fontSize: '.7rem', color: '#888', fontWeight: 700 }}>VERSION</div>
                  <div style={{ fontWeight: 800, fontSize: '.9rem' }}>2.0.0</div>
                </div>
                <div style={{
                  background: '#f7f3ee', borderRadius: '10px',
                  padding: '.6rem .75rem', textAlign: 'center',
                  border: '1px solid #e0d8cf',
                }}>
                  <div style={{ fontSize: '.7rem', color: '#888', fontWeight: 700 }}>YEAR</div>
                  <div style={{ fontWeight: 800, fontSize: '.9rem' }}>2026</div>
                </div>
                <div style={{
                  background: '#f7f3ee', borderRadius: '10px',
                  padding: '.6rem .75rem', textAlign: 'center',
                  border: '1px solid #e0d8cf',
                }}>
                  <div style={{ fontSize: '.7rem', color: '#888', fontWeight: 700 }}>CURRICULUM</div>
                  <div style={{ fontWeight: 800, fontSize: '.9rem' }}>CAPS</div>
                </div>
                <div style={{
                  background: '#f7f3ee', borderRadius: '10px',
                  padding: '.6rem .75rem', textAlign: 'center',
                  border: '1px solid #e0d8cf',
                }}>
                  <div style={{ fontSize: '.7rem', color: '#888', fontWeight: 700 }}>GRADE</div>
                  <div style={{ fontWeight: 800, fontSize: '.9rem' }}>Grade 6</div>
                </div>
              </div>

              {/* Topics covered */}
              <div style={{
                background: '#fff7e6',
                borderRadius: '12px',
                padding: '.75rem 1rem',
                marginBottom: '1.25rem',
                border: '1px solid #f5c96a',
              }}>
                <div style={{ fontSize: '.72rem', fontWeight: 800, color: '#c8860a', letterSpacing: '.06em', marginBottom: '.4rem' }}>
                  TOPICS COVERED
                </div>
                <div style={{ fontSize: '.8rem', lineHeight: 1.8, color: '#444' }}>
                  🔢 Numbers & Operations &nbsp;·&nbsp; ½ Fractions<br />
                  📐 Geometry &nbsp;·&nbsp; 📏 Measurement<br />
                  📊 Data Handling &nbsp;·&nbsp; 🔷 Patterns<br />
                  🔢 Decimal Fractions
                </div>
              </div>

              {/* Copyright */}
              <div style={{
                textAlign: 'center',
                fontSize: '.75rem',
                color: '#aaa',
                marginBottom: '1rem',
                lineHeight: 1.6,
              }}>
                © 2026 Tebogo Maruping · Contoso Tech<br />
                All rights reserved · Made with ❤️ in South Africa 🇿🇦
              </div>

              {/* Close button */}
              <button
                onClick={() => setShow(false)}
                style={{
                  width: '100%',
                  padding: '.7rem',
                  borderRadius: '12px',
                  background: '#1a7fe8',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '.95rem',
                  cursor: 'pointer',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
