export default function Market({ v }) {
  return (
    <>
      <div style={{ padding: '4px 20px 4px', flex: 'none' }}>
        <div style={{ fontSize: 13, color: '#5A564C', marginBottom: 2 }}>Bonjour {v.profileName.split(' ')[0]}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19 }}>Ton résumé</div>
          {v.isHostEligible && (
            <div onClick={v.toggleHostMode} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 999, padding: 4, cursor: 'pointer' }}>
              <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: v.buyerModeBg, color: v.buyerModeFg }}>Acheteur</div>
              <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: v.hostModeBg, color: v.hostModeFg }}>Host</div>
            </div>
          )}
        </div>
        <div onClick={v.goBrowse} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 14, padding: '12px 14px', marginBottom: 14, cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8A8578" strokeWidth="2" /><path d="M21 21l-4.3-4.3" stroke="#8A8578" strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 14, color: '#8A8578', flex: 1 }}>Netflix, Spotify, Canal+...</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: '#7F011F', borderRadius: 16, padding: 14, color: '#F5EBD0' }}>
            <div style={{ fontSize: 11.5, opacity: 0.8, fontWeight: 600 }}>Abonnements actifs</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, marginTop: 4 }}>{v.activeCount}</div>
            <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 2 }}>{v.monthlySpendDisplay}/mois</div>
          </div>
          <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
            <div style={{ fontSize: 11.5, color: '#8A8578', fontWeight: 600 }}>Ventes réalisées</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, marginTop: 4, color: '#1C1B1F' }}>{v.salesCount}</div>
            <div style={{ fontSize: 11.5, color: '#8A8578', marginTop: 2 }}>via tes annonces</div>
          </div>
        </div>
      </div>

      {v.hasActive && (
        <>
          <div style={{ padding: '20px 20px 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, flex: 'none' }}>Tes abonnements actifs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 20px 0' }}>
            {v.purchasedDisplay.map((p) => (
              <div key={p.id} onClick={p.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: '12px 14px', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', background: p.color }}>{p.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.service} — {p.plan}</div>
                  <div style={{ fontSize: 11.5, color: '#8A8578', marginTop: 2 }}>{p.priceDisplay} · jusqu'au {p.until}</div>
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: '#1F8A5D', background: '#F1F7F3', padding: '4px 8px', borderRadius: 6 }}>{p.status}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
