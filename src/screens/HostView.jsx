export default function HostView({ v }) {
  return (
    <>
      <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19 }}>Tes cercles</div>
        <div onClick={v.toggleHostMode} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 999, padding: 4 }}>
          <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: '#5A564C' }}>Acheteur</div>
          <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: '#7F011F', color: '#F5EBD0' }}>Host</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, padding: '14px 20px 0' }}>
        <div style={{ flex: 1, background: '#7F011F', borderRadius: 16, padding: 14, color: '#F5EBD0' }}>
          <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 600 }}>Revenu ce mois</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, marginTop: 4 }}>{v.hostRevenueDisplay}</div>
        </div>
        <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 600 }}>Cercles actifs</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, marginTop: 4 }}>{v.hostCirclesCount}</div>
        </div>
        <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 600 }}>Membres</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, marginTop: 4 }}>{v.hostMembersCount}</div>
        </div>
      </div>

      <div style={{ margin: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: '14px 16px' }}>
        <div>
          <div style={{ fontSize: 11, color: '#8A8578', fontWeight: 600 }}>Solde disponible</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, marginTop: 2 }}>{v.hostBalanceDisplay}</div>
        </div>
        <div onClick={v.openWithdraw} style={{ padding: '11px 16px', borderRadius: 10, background: '#7F011F', color: '#F5EBD0', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Retirer mes gains</div>
      </div>

      {v.hasHostAlerts && (
        <div style={{ margin: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {v.hostAlerts.map((al, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#FDF3E3', border: '1px solid #F0E2C8', borderRadius: 12, padding: '10px 12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 2 }}><path d="M12 9v4M12 17h.01" stroke="#B8790A" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="#B8790A" strokeWidth="1.6" /></svg>
              <span style={{ fontSize: 12, color: '#8A6A2E', lineHeight: 1.4 }}>{al.text}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 20px 16px' }}>
        {v.noSales && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '34px 16px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Aucun cercle pour l'instant</div>
            <div style={{ fontSize: 12.5, color: '#8A8578', lineHeight: 1.5 }}>Crée un cercle pour partager un abonnement et recevoir des paiements.</div>
          </div>
        )}
        {v.soldDisplay.map((sv) => (
          <div key={sv.id} style={{ background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: sv.color }}>{sv.letter}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{sv.service} — {sv.plan}</div>
                <div style={{ fontSize: 12, color: '#8A8578', marginTop: 2 }}>{sv.revenueDisplay} · {sv.seatsLabel}</div>
                {sv.isLastSeat && (
                  <div style={{ display: 'inline-block', marginTop: 5, fontSize: 10.5, fontWeight: 700, color: '#7F011F', background: '#F6E1E4', padding: '3px 7px', borderRadius: 6 }}>Dernière place !</div>
                )}
              </div>
              <div onClick={sv.onEdit} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F5EBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div onClick={sv.onDelete} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F6E1E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: '#F0EAD8', marginTop: 12, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#7F011F', width: `${sv.fillPct}%` }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <div onClick={sv.onToggleExpand} style={{ fontSize: 12, fontWeight: 700, color: '#7F011F', cursor: 'pointer' }}>{sv.membersToggleLabel}</div>
              <div onClick={sv.onShareInvite} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#7F011F', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M8 12v6a2 2 0 002 2h8a2 2 0 002-2v-6M12 16V4M8 8l4-4 4 4" stroke="#7F011F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Partager le cercle
              </div>
            </div>
            {sv.expanded && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sv.members.map((mem, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 12.5, color: '#5A564C' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: mem.dotColor, flex: 'none' }} />{mem.name}
                    </div>
                    <span style={{ color: '#8A8578', fontSize: 11.5 }}>Réabo. {mem.renewal}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px 30px' }}>
        <div onClick={v.goSell} style={{ textAlign: 'center', padding: 13, borderRadius: 12, background: '#F6E1E4', color: '#7F011F', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>+ Créer un nouveau cercle</div>
      </div>
    </>
  );
}
