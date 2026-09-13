const inputStyle = { border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', color: '#1C1B1F', boxSizing: 'border-box' };
const labelStyle = { fontSize: 12.5, fontWeight: 700, color: '#5A564C' };

export default function Sell({ v }) {
  return (
    <div style={{ padding: '4px 20px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {v.kycNeeded && (
        <>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19 }}>Vérifie ton identité</div>
            <div style={{ fontSize: 13, color: '#8A8578', marginTop: 4, lineHeight: 1.5 }}>Pour protéger les acheteurs, on vérifie l'identité de chaque vendeur avant la première publication, via notre partenaire Didit (pièce d'identité + reconnaissance faciale).</div>
          </div>
          {v.kycSessionPending ? (
            <>
              <div style={{ padding: 16, borderRadius: 14, background: '#FDF6EE', border: '1px solid #F0E2C8', fontSize: 13, color: '#8A6A2E', lineHeight: 1.5 }}>
                Ta vérification est en cours de traitement chez Didit. Reviens dans quelques instants et rafraîchis ton statut.
              </div>
              <button onClick={v.checkKycVerification} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer' }}>Vérifier mon statut</button>
            </>
          ) : (
            <button onClick={v.startKycVerification} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer' }}>Démarrer la vérification d'identité</button>
          )}
        </>
      )}

      {v.kycCheckingSub && (
        <>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19 }}>Vérifie ton abonnement</div>
            <div style={{ fontSize: 13, color: '#8A8578', marginTop: 4, lineHeight: 1.5 }}>On confirme que l'abonnement que tu veux partager fonctionne bien avant de créer ton cercle.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Service</label>
            <select value={v.sellService} onChange={v.setSellService} style={inputStyle}>
              {v.serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          {v.sellIsLink && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={labelStyle}>Lien d'invitation</label>
              <input value={v.sellAccessLink} onChange={v.setSellAccessLink} placeholder="https://..." style={inputStyle} />
            </div>
          )}
          {v.sellIsCredentials && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Email du compte</label>
                <input value={v.sellAccessEmail} onChange={v.setSellAccessEmail} placeholder="compte.partage@gmail.com" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Mot de passe du compte</label>
                <input value={v.sellAccessPassword} onChange={v.setSellAccessPassword} placeholder="Mot de passe" style={inputStyle} />
              </div>
            </>
          )}
          <button onClick={v.verifySubscription} disabled={v.subCheckDisabled} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: v.subCheckBtnBg, cursor: 'pointer', opacity: v.subCheckBtnOpacity }}>Vérifier mon abonnement</button>
        </>
      )}

      {v.kycVerifiedAndSelling && (
        <>
          {v.sellNotSubmitted && (
            <>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19 }}>{v.sellHeading}</div>
                <div style={{ fontSize: 13, color: '#8A8578', marginTop: 4, lineHeight: 1.5 }}>Définis les places disponibles dans ton cercle et le prix par membre.</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Service</label>
                <select value={v.sellService} onChange={v.setSellService} style={inputStyle}>
                  {v.serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Formule / type de place</label>
                <input value={v.sellPlan} onChange={v.setSellPlan} placeholder="Ex: Premium 4 écrans, 1 place" style={inputStyle} />
              </div>

              {v.sellIsLink && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Lien d'invitation</label>
                  <input value={v.sellAccessLink} onChange={v.setSellAccessLink} placeholder="https://..." style={inputStyle} />
                </div>
              )}
              {v.sellIsCredentials && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={labelStyle}>Email du compte</label>
                    <input value={v.sellAccessEmail} onChange={v.setSellAccessEmail} placeholder="compte.partage@gmail.com" style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={labelStyle}>Mot de passe du compte</label>
                    <input value={v.sellAccessPassword} onChange={v.setSellAccessPassword} placeholder="Mot de passe" style={inputStyle} />
                  </div>
                </>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <label style={labelStyle}>Places dispo</label>
                  <input type="number" min="1" value={v.sellSeats} onChange={v.setSellSeats} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <label style={labelStyle}>Prix / mois (FCFA)</label>
                  <input type="number" min="0" value={v.sellPrice} onChange={v.setSellPrice} placeholder="1500" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Description (optionnel)</label>
                <textarea value={v.sellDesc} onChange={v.setSellDesc} placeholder="Détails utiles pour l'acheteur..." rows={3} style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <button onClick={v.submitSell} disabled={v.sellDisabled} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: v.sellBtnBg, cursor: 'pointer', opacity: v.sellBtnOpacity }}>{v.sellSubmitLabel}</button>
            </>
          )}
          {v.sellSubmitted && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '40px 10px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1F8A5D', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn .3s ease-out' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>Ton cercle est créé !</div>
              <div style={{ fontSize: 13, color: '#8A8578', lineHeight: 1.5 }}>Ta place pour {v.lastSellService} — {v.lastSellPlan} est maintenant visible dans la marketplace.</div>
              <button onClick={v.newListing} style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 20px', fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 14, color: '#1C1B1F', background: '#FFFFFF', cursor: 'pointer', width: '100%' }}>Publier une autre annonce</button>
              <button onClick={v.goToVentes} style={{ border: 'none', borderRadius: 12, padding: '12px 20px', fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer', width: '100%' }}>Voir mes cercles</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
