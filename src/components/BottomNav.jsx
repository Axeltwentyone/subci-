export default function BottomNav({ v }) {
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))', zIndex: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 18px',
      borderRadius: 24, background: 'rgba(245,235,208,0.75)', backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)',
      boxShadow: '0 8px 24px rgba(127,1,31,0.18)',
    }}>
      <div onClick={v.goMarket} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z" stroke={v.marketColor} strokeWidth="1.8" strokeLinejoin="round" /></svg>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: v.marketColor }}>Accueil</span>
      </div>
      <div onClick={v.goSell} style={{
        width: 52, height: 52, borderRadius: '50%', background: '#7F011F', boxShadow: '0 6px 16px rgba(127,1,31,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: -26,
        border: '3px solid rgba(245,235,208,0.7)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#F5EBD0" strokeWidth="2.2" strokeLinecap="round" /></svg>
      </div>
      <div onClick={v.goVentes} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="8" r="3" stroke={v.ventesColor} strokeWidth="1.8" />
          <circle cx="16" cy="9" r="2.4" stroke={v.ventesColor} strokeWidth="1.8" />
          <path d="M3 19c.7-3 3-5 5-5s4.3 2 5 5" stroke={v.ventesColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13.5 15c1.6.2 3 1.8 3.5 4" stroke={v.ventesColor} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: v.ventesColor }}>Mes cercles</span>
      </div>
    </div>
  );
}
