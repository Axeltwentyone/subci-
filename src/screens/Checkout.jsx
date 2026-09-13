export default function Checkout({ v }) {
  const selected = v.selected;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5EBD0', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16 }}>Paiement</div>
        <div onClick={v.closeCheckout} style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 20px 14px', flex: 'none' }}>
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: v.dot1 }} />
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: v.dot2 }} />
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: v.dot3 }} />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px' }}>

        {v.step1 && selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Récapitulatif</div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}><span style={{ color: '#8A8578' }}>Abonnement</span><span style={{ fontWeight: 700 }}>{selected.service}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}><span style={{ color: '#8A8578' }}>Formule</span><span style={{ fontWeight: 700 }}>{selected.plan}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}><span style={{ color: '#8A8578' }}>Vendeur</span><span style={{ fontWeight: 700 }}>{selected.seller}</span></div>
              <div style={{ height: 1, background: '#E8DCC0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}><span style={{ fontWeight: 700 }}>Total / mois</span><span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{selected.priceDisplay}</span></div>
            </div>
            <button onClick={v.goStep2} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer' }}>Continuer</button>
          </div>
        )}

        {v.step2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Choisis ton moyen de paiement</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {v.paymentMethods.map((m) => (
                <div key={m.id} onClick={m.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, background: m.bg, border: `1.5px solid ${m.border}`, borderRadius: 14, padding: '13px 14px', cursor: 'pointer' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: m.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{m.badge}</div>
                  <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{m.name}</span>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${m.dotBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.active && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#7F011F' }} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Numéro Mobile Money</label>
              <input value={v.phoneNumber} onChange={v.setPhoneNumber} placeholder="07 00 00 00 00" style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', boxSizing: 'border-box' }} />
            </div>
            <button onClick={v.confirmPayment} disabled={v.payDisabled} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: v.payBtnBg, cursor: 'pointer', opacity: v.payBtnOpacity }}>Payer {selected?.priceDisplay}</button>
          </div>
        )}

        {v.step3 && selected && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '30px 10px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1F8A5D', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn .3s ease-out' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>Paiement réussi !</div>
            <div style={{ fontSize: 13, color: '#8A8578', lineHeight: 1.5 }}>Ta place pour {selected.service} — {selected.plan} est activée. Retrouve-la dans ton profil.</div>
            <button onClick={v.finishCheckout} style={{ border: 'none', borderRadius: 12, padding: '13px 20px', fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer', width: '100%' }}>Voir mon abonnement</button>
          </div>
        )}

      </div>
    </div>
  );
}
