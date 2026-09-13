export default function Browse({ v }) {
  return (
    <>
      <div style={{ padding: '14px 20px 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, flex: 'none' }}>Tous les abonnements</div>
      <div style={{ padding: '0 20px 4px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 14, padding: '11px 14px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8A8578" strokeWidth="2" /><path d="M21 21l-4.3-4.3" stroke="#8A8578" strokeWidth="2" strokeLinecap="round" /></svg>
          <input value={v.searchQuery} onChange={v.setSearchQuery} placeholder="Netflix, Spotify, Canal+..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Manrope',sans-serif", fontSize: 14, color: '#1C1B1F', flex: 1 }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 20px 6px', flex: 'none' }}>
        {v.filters.map((f) => (
          <div key={f.name} onClick={f.onClick} style={{ flex: 'none', padding: '8px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', background: f.bg, color: f.fg, border: `1px solid ${f.border}` }}>{f.name}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 6px', flex: 'none' }}>
        {v.sortOptions.map((so) => (
          <div key={so.id} onClick={so.onClick} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', background: so.bg, color: so.fg, border: `1px solid ${so.border}` }}>{so.name}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '6px 20px 24px' }}>
        {v.listings.map((l) => (
          <div key={l.id} onClick={l.onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 18, padding: 14, cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: '#FFFFFF', background: l.color }}>{l.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{l.service}</div>
              <div style={{ fontSize: 12.5, color: '#8A8578', marginTop: 1 }}>{l.plan}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, marginTop: 6 }}>{l.priceDisplay}</div>
              <div style={{ marginTop: 6, display: 'inline-block', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: l.seatsBg, color: l.seatsFg }}>{l.seatsLabel}</div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ flex: 'none' }}><path d="M1 1l6 6-6 6" stroke="#C4B48A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
        {v.noResults && (
          <div style={{ textAlign: 'center', color: '#8A8578', fontSize: 13, padding: '30px 0' }}>Aucune offre ne correspond à ta recherche.</div>
        )}
      </div>
    </>
  );
}
