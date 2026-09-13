export default function PurchasedDetail({ v }) {
  const p = v.selectedPurchased;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5EBD0', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 6px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
          <div onClick={v.closePurchasedDetail} style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M8 1L1 7.5 8 14" stroke="#1C1B1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Mon abonnement</div>
        </div>
        <div style={{ margin: '8px 20px 0', padding: '26px 20px', borderRadius: 20, background: p.color, color: '#fff', flex: 'none' }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{p.letter}</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 21 }}>{p.service}</div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>{p.plan}</div>
        </div>
        <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22 }}>{p.priceDisplay}</span>
          <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 10px', borderRadius: 8, background: '#F1F7F3', color: '#1F8A5D' }}>{p.status}</span>
        </div>
        <div style={{ margin: '16px 20px 0', padding: 16, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}><span style={{ color: '#8A8578' }}>Renouvellement</span><span style={{ fontWeight: 700 }}>{p.until}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}><span style={{ color: '#8A8578' }}>Statut</span><span style={{ fontWeight: 700 }}>{p.status}</span></div>
        </div>
        <div onClick={v.downloadReceipt} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, margin: '10px 20px 0', padding: 12, borderRadius: 12, background: '#FFFFFF', border: '1px solid #E8DCC0', color: '#1C1B1F', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v12M7 11l5 5 5-5M5 21h14" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Télécharger le reçu
        </div>

        {p.isCredentials && (
          <div style={{ margin: '16px 20px 0', padding: 16, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Tes identifiants d'accès</div>
            <div>
              <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 700, marginBottom: 4 }}>EMAIL</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: '#F5EBD0', borderRadius: 10, padding: '10px 12px' }}>
                <span style={{ fontSize: 13, wordBreak: 'break-all' }}>{p.accessEmail}</span>
                <span onClick={v.copyEmail} style={{ fontSize: 11.5, fontWeight: 700, color: '#7F011F', cursor: 'pointer', flex: 'none' }}>Copier</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 700, marginBottom: 4 }}>MOT DE PASSE</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: '#F5EBD0', borderRadius: 10, padding: '10px 12px' }}>
                <span style={{ fontSize: 13 }}>{p.accessPassword}</span>
                <span onClick={v.copyPassword} style={{ fontSize: 11.5, fontWeight: 700, color: '#7F011F', cursor: 'pointer', flex: 'none' }}>Copier</span>
              </div>
            </div>
          </div>
        )}

        {p.isLink && (
          <div style={{ margin: '16px 20px 0', padding: 16, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Lien d'invitation</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: '#F5EBD0', borderRadius: 10, padding: '10px 12px' }}>
              <span style={{ fontSize: 12.5, wordBreak: 'break-all', color: '#7F011F' }}>{p.accessLink}</span>
            </div>
            <span onClick={v.copyLink} style={{ textAlign: 'center', padding: 12, borderRadius: 10, background: '#7F011F', color: '#F5EBD0', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Copier le lien</span>
          </div>
        )}

        <div style={{ margin: '16px 20px 0', padding: 16, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.hasRated && (
            <>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Ton avis</div>
              <div style={{ fontSize: 16, color: '#B8790A' }}>{p.ratedStarsLabel}</div>
            </>
          )}
          {p.notRated && (
            <>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Noter le vendeur</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {v.ratingStarsDisplay.map((rs) => (
                  <span key={rs.n} onClick={rs.onClick} style={{ fontSize: 24, cursor: 'pointer', color: rs.filled }}>★</span>
                ))}
              </div>
              <textarea value={v.ratingComment} onChange={v.setRatingComment} placeholder="Un commentaire (optionnel)..." rows={2} style={{ border: '1px solid #E8DCC0', borderRadius: 10, padding: '10px 12px', fontFamily: "'Manrope',sans-serif", fontSize: 13, background: '#F5EBD0', boxSizing: 'border-box', resize: 'none' }} />
              <span onClick={v.submitRating} style={{ textAlign: 'center', padding: 11, borderRadius: 10, background: '#7F011F', color: '#F5EBD0', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Envoyer l'avis</span>
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 'none', padding: '14px 20px calc(28px + env(safe-area-inset-bottom, 0px))', background: '#F5EBD0', borderTop: '1px solid #E8DCC0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={v.contactSeller} style={{ width: '100%', border: '1px solid #E8DCC0', borderRadius: 14, padding: 14, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 14, color: '#1C1B1F', background: '#FFFFFF', cursor: 'pointer' }}>Contacter le vendeur</button>
        <button onClick={v.cancelSubscription} style={{ width: '100%', border: 'none', borderRadius: 14, padding: 14, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 14, color: '#7F011F', background: '#F6E1E4', cursor: 'pointer' }}>Annuler l'abonnement</button>
      </div>
    </div>
  );
}
