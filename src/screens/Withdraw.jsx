export default function Withdraw({ v }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5EBD0', zIndex: 250, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16 }}>Retirer mes gains</div>
        <div onClick={v.closeWithdraw} style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px calc(20px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 600 }}>Solde disponible</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, marginTop: 2 }}>{v.hostBalanceDisplay}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Montant à retirer (FCFA)</label>
          <input type="number" value={v.withdrawAmount} onChange={v.setWithdrawAmount} placeholder="5000" style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Moyen de retrait</label>
          {v.withdrawOperators.map((m) => (
            <div key={m.id} onClick={m.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, background: m.bg, border: `1.5px solid ${m.border}`, borderRadius: 14, padding: '13px 14px', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: m.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{m.badge}</div>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{m.name}</span>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${m.dotBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.active && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#7F011F' }} />}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Numéro Mobile Money</label>
          <input value={v.withdrawPhone} onChange={v.setWithdrawPhone} placeholder="07 00 00 00 00" style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', boxSizing: 'border-box' }} />
        </div>
        <button onClick={v.submitWithdraw} disabled={v.withdrawDisabled} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: v.withdrawBtnBg, cursor: 'pointer' }}>Confirmer le retrait</button>

        {v.hasWithdrawals && (
          <>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 6 }}>Historique des retraits</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {v.withdrawalsDisplay.map((w) => (
                <div key={w.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{w.amountDisplay}</div>
                    <div style={{ fontSize: 11.5, color: '#8A8578', marginTop: 2 }}>{w.date}</div>
                  </div>
                  <span onClick={w.onReceipt} style={{ fontSize: 11.5, fontWeight: 700, color: '#7F011F', cursor: 'pointer' }}>Reçu</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
