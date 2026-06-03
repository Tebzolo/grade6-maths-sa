export default function TabNav({ tabs, activeTab, onTab }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      padding: '.5rem .75rem',
      background: '#fff',
      borderBottom: '1px solid #e0d8cf',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTab(tab.id)}
          style={{
            padding: '.35rem .75rem',
            borderRadius: '999px',
            fontSize: '.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: `2px solid ${tab.color}`,
            background: activeTab === tab.id ? tab.color : 'transparent',
            color: activeTab === tab.id ? '#fff' : tab.color,
            fontFamily: "'Nunito', sans-serif",
            transition: 'all .2s',
            whiteSpace: 'nowrap',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
