export default function Auth({ v }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#7F011F', zIndex: 500,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '32px', boxSizing: 'border-box', overflow: 'auto',
    }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 30, color: '#F5EBD0', marginBottom: 6 }}>
        sub<span style={{ color: '#F5EBD0', opacity: 0.6 }}>.ci</span>
      </div>
      <div style={{ fontSize: 14, color: '#F5EBD0', opacity: 0.85, marginBottom: 28, lineHeight: 1.5 }}>
        Achète et revends tes places d'abonnements en toute confiance.
      </div>

      <div style={{ display: 'flex', background: 'rgba(245,235,208,0.15)', borderRadius: 12, padding: 4, marginBottom: 22 }}>
        <div onClick={v.goLoginScreen} style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: v.loginTabBg, color: v.loginTabFg }}>Se connecter</div>
        <div onClick={v.goSignupScreen} style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: v.signupTabBg, color: v.signupTabFg }}>Créer un compte</div>
      </div>

      {v.isLoginScreen && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: '#F5EBD0' }}>Email ou numéro</label>
            <input value={v.loginId} onChange={v.setLoginId} placeholder="awa.kone@gmail.com" style={{ border: 'none', borderRadius: 12, padding: 14, fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#F5EBD0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: '#F5EBD0' }}>Mot de passe</label>
            <input type="password" value={v.loginPassword} onChange={v.setLoginPassword} placeholder="••••••••" style={{ border: 'none', borderRadius: 12, padding: 14, fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#F5EBD0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: '#F5EBD0', opacity: 0.8, marginBottom: 20, cursor: 'pointer' }}>Mot de passe oublié ?</div>
          <div onClick={v.login} style={{ textAlign: 'center', padding: 15, borderRadius: 14, background: '#F5EBD0', color: '#7F011F', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Se connecter</div>
        </>
      )}

      {v.isSignupScreen && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: '#F5EBD0' }}>Nom complet</label>
            <input value={v.signupName} onChange={v.setSignupName} placeholder="Awa Koné" style={{ border: 'none', borderRadius: 12, padding: 14, fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#F5EBD0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: '#F5EBD0' }}>Email ou numéro</label>
            <input value={v.signupId} onChange={v.setSignupId} placeholder="awa.kone@gmail.com" style={{ border: 'none', borderRadius: 12, padding: 14, fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#F5EBD0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: '#F5EBD0' }}>Mot de passe</label>
            <input type="password" value={v.signupPassword} onChange={v.setSignupPassword} placeholder="••••••••" style={{ border: 'none', borderRadius: 12, padding: 14, fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#F5EBD0', boxSizing: 'border-box' }} />
          </div>
          <div onClick={v.signup} style={{ textAlign: 'center', padding: 15, borderRadius: 14, background: '#F5EBD0', color: '#7F011F', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Créer mon compte</div>
        </>
      )}

      <div style={{ textAlign: 'center', fontSize: 12, color: '#F5EBD0', opacity: 0.7, marginTop: 18 }}>
        En continuant, tu acceptes les conditions d'utilisation de sub.ci.
      </div>
    </div>
  );
}
