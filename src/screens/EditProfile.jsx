export default function EditProfile({ v }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F5EBD0', zIndex: 250, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16 }}>Modifier mon profil</div>
        <div onClick={v.closeEditProfile} style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="#1C1B1F" strokeWidth="2" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 20px calc(20px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#7F011F', color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {v.profileName0}
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 26, height: 26, borderRadius: '50%', background: '#FFFFFF', border: '2px solid #F5EBD0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 7h3l2-3h6l2 3h3v12H4V7z" stroke="#7F011F" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.2" stroke="#7F011F" strokeWidth="1.8" /></svg>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Nom complet</label>
          <input value={v.editProfileName} onChange={v.setEditProfileName} style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#5A564C' }}>Téléphone</label>
          <input value={v.editProfilePhone} onChange={v.setEditProfilePhone} placeholder="07 00 00 00 00" style={{ border: '1px solid #E8DCC0', borderRadius: 12, padding: '12px 14px', fontFamily: "'Manrope',sans-serif", fontSize: 14, background: '#FFFFFF', boxSizing: 'border-box' }} />
        </div>
        <button onClick={v.saveProfile} style={{ border: 'none', borderRadius: 14, padding: 15, fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: '#7F011F', cursor: 'pointer' }}>Enregistrer</button>
      </div>
    </div>
  );
}
