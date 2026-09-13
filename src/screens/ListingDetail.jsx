export default function ListingDetail({ v }) {
  const selected = v.selected;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5EBD0', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 6px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
          <div onClick={v.closeDetail} style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M8 1L1 7.5 8 14" stroke="#1C1B1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Détail de l'offre</div>
        </div>
        <div style={{ margin: '8px 20px 0', padding: '26px 20px', borderRadius: 20, background: selected.color, color: '#fff', flex: 'none' }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{selected.letter}</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 21 }}>{selected.service}</div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>{selected.plan}</div>
        </div>
        <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22 }}>{selected.priceDisplay}</span>
          <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 10px', borderRadius: 8, background: selected.seatsBg, color: selected.seatsFg }}>{selected.seatsLabel}</span>
        </div>
        <div style={{ padding: '14px 20px 0', fontSize: 13.5, lineHeight: 1.6, color: '#5A564C' }}>{selected.desc}</div>
        <div style={{ margin: '16px 20px 0', padding: '14px 16px', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#EFE3C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, flex: 'none' }}>{selected.sellerInitial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>{selected.seller}</span>
              {selected.verified && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 1.4 2.7-.4 1.4 2.4 2.4 1.4-.4 2.7 1.4 2.4-1.4 2.4.4 2.7-2.4 1.4-1.4 2.4-2.7-.4L12 22l-2.4-1.4-2.7.4-1.4-2.4-2.4-1.4.4-2.7L2 12l1.4-2.4-.4-2.7 2.4-1.4 1.4-2.4 2.7.4L12 2z" fill="#1F8A5D" /><path d="M8.5 12.2l2.2 2.2 4.5-4.7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </div>
            <div style={{ fontSize: 12, color: '#8A8578', marginTop: 2 }}>★ {selected.ratingLabel} · vendeur</div>
            {selected.verified && (
              <div style={{ fontSize: 11, color: '#1F8A5D', marginTop: 3 }}>Identité vérifiée par pièce d'identité</div>
            )}
            {selected.notVerified && (
              <div style={{ fontSize: 11, color: '#B8790A', marginTop: 3 }}>Identité non vérifiée — achète avec prudence</div>
            )}
          </div>
        </div>

        {selected.hasReviews && (
          <div style={{ margin: '0 20px', padding: '14px 16px', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Avis des acheteurs</div>
            {selected.reviews.map((rv, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}><span style={{ fontWeight: 700 }}>{rv.author}</span><span style={{ color: '#B8790A' }}>{rv.starsLabel}</span></div>
                <div style={{ fontSize: 12, color: '#5A564C', marginTop: 3, lineHeight: 1.5 }}>{rv.text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ margin: '14px 20px 20px', padding: '13px 16px', background: '#FDF6EE', border: '1px solid #F0E2C8', borderRadius: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" stroke="#B8790A" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 12.5, color: '#8A6A2E', lineHeight: 1.5 }}>Garantie remboursement 48h si l'accès promis ne fonctionne pas.</span>
        </div>
      </div>
      <div style={{ flex: 'none', padding: '14px 20px calc(28px + env(safe-area-inset-bottom, 0px))', background: '#F5EBD0', borderTop: '1px solid #E8DCC0' }}>
        <button onClick={v.startCheckout} style={{ width: '100%', border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer' }}>Acheter cette place · {selected.priceDisplay}</button>
      </div>
    </div>
  );
}
