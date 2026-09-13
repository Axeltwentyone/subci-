export default function NotifPanel({ v }) {
  return (
    <>
      <div onClick={v.toggleNotif} style={{ position: 'absolute', inset: 0, background: 'rgba(28,27,31,0.35)', zIndex: 150 }} />
      <div style={{
        position: 'absolute', top: 'calc(66px + env(safe-area-inset-top, 0px))', right: 20, left: 20,
        background: '#FFFFFF', border: '1px solid #E8DCC0', borderRadius: 16, padding: 14, zIndex: 160,
        boxShadow: '0 12px 30px rgba(28,27,31,0.15)', display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Notifications</div>
        {v.notifications.map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderTop: '1px solid #F0EAD8' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7F011F', marginTop: 5, flex: 'none' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: '#8A8578', marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
