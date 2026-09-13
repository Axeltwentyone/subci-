export default function Toast({ text }) {
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 'calc(110px + env(safe-area-inset-bottom, 0px))',
      transform: 'translateX(-50%)', background: '#1C1B1F', color: '#fff', padding: '12px 18px',
      borderRadius: 12, fontSize: 13, fontWeight: 700, zIndex: 400, animation: 'toastIn .25s ease-out',
      whiteSpace: 'nowrap',
    }}>{text}</div>
  );
}
