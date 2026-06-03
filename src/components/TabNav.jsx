export default function TabNav({ tabs, activeTab, onTab }) {
  return (
    <nav style={{
      display: 'flex',
      gap: '8px',
      padding: '.75rem 1rem',
      overflowX: 'auto',
      background: '#fff',
      borderBottom: '1px solid #e0d8cf',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      scrollbarWidth: 'none',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTab(tab.id)}
          style={{
            flexShrink: 0,
            padding: '.4rem .9rem',
            borderRadius: '999px',
            fontSize: '.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: `2px solid ${tab.color}`,
            background: activeTab === tab.id ? tab.color : 'transparent',
            color: activeTab === tab.id ? '#fff' : tab.color,
            fontFamily: "'Nunito', sans-serif",
            transition: 'all .2s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
