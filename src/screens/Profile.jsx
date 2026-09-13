export default function Profile({ v }) {
  return (
    <div style={{ padding: '4px 20px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 18, padding: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#7F011F', color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{v.profileName0}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{v.profileName}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 1.4 2.7-.4 1.4 2.4 2.4 1.4-.4 2.7 1.4 2.4-1.4 2.4.4 2.7-2.4 1.4-1.4 2.4-2.7-.4L12 22l-2.4-1.4-2.7.4-1.4-2.4-2.4-1.4.4-2.7L2 12l1.4-2.4-.4-2.7 2.4-1.4 1.4-2.4 2.7.4L12 2z" fill="#1F8A5D" /><path d="M8.5 12.2l2.2 2.2 4.5-4.7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontSize: 12.5, color: '#8A8578', marginTop: 3 }}>★ {v.rating.toFixed(1)} · {v.transactionsCount} transactions</div>
        </div>
        <div onClick={v.openEditProfile} style={{ width: 34, height: 34, borderRadius: '50%', background: '#F5EBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {v.profileTabs.map((pt) => (
          <div key={pt.id} onClick={pt.onClick} style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: pt.bg, color: pt.fg }}>{pt.label}</div>
        ))}
      </div>

      {v.showAchats && (
        <>
          {v.noActive && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '34px 16px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Aucun abonnement actif</div>
              <div style={{ fontSize: 12.5, color: '#8A8578', lineHeight: 1.5 }}>Tu n'as encore acheté aucune place. Trouve un abonnement dans la marketplace.</div>
              <div onClick={v.goBrowseFromProfile} style={{ marginTop: 4, padding: '10px 18px', borderRadius: 10, background: '#7F011F', color: '#F5EBD0', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Trouver un abonnement</div>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {v.purchasedDisplay.map((p) => (
              <div key={p.id} onClick={p.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14, cursor: 'pointer' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: p.color }}>{p.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.service} — {p.plan}</div>
                  <div style={{ fontSize: 12, color: '#8A8578', marginTop: 2 }}>{p.priceDisplay} · jusqu'au {p.until}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1F8A5D', background: '#F1F7F3', padding: '4px 8px', borderRadius: 6 }}>{p.status}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {v.showVentes && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {v.soldDisplay.map((sv) => (
            <div key={sv.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: sv.color }}>{sv.letter}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{sv.service} — {sv.plan}</div>
                <div style={{ fontSize: 12, color: '#8A8578', marginTop: 2 }}>{sv.priceDisplay} · {sv.ventesLabel}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#B8790A', background: '#FDF3E3', padding: '4px 8px', borderRadius: 6, flex: 'none' }}>{sv.status}</div>
              <div onClick={sv.onEdit} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F5EBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div onClick={sv.onDelete} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F6E1E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          ))}
          {v.noSales && (
            <div style={{ textAlign: 'center', color: '#8A8578', fontSize: 13, padding: '30px 0' }}>Tu n'as encore publié aucune annonce.</div>
          )}
        </div>
      )}

      {v.showHistorique && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {v.historyDisplay.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: h.iconBg }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d={h.iconPath} stroke={h.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{h.label}</div>
                <div style={{ fontSize: 11.5, color: '#8A8578', marginTop: 2 }}>{h.date}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: h.amountColor }}>{h.amountLabel}</div>
            </div>
          ))}
        </div>
      )}

      <div onClick={v.logout} style={{ textAlign: 'center', padding: 13, borderRadius: 12, color: '#7F011F', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', marginTop: 4 }}>Se déconnecter</div>
    </div>
  );
}
