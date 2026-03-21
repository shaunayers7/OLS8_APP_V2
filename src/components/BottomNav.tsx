import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/',        icon: '◈',  label: 'Home' },
  { path: '/lists',   icon: '☰',  label: 'Lists' },
  { path: '/ops',     icon: '⚡', label: 'Ops' },
  { path: '/team',    icon: '◉',  label: 'Team' },
  { path: '/ref',     icon: '📡', label: 'Ref' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav style={{
      height: 'calc(var(--nav-h) + var(--safe-b))',
      paddingBottom: 'var(--safe-b)',
      background: '#080808',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      flexShrink: 0,
      zIndex: 50,
    }}>
      {TABS.map(tab => {
        const active = tab.path === '/'
          ? pathname === '/'
          : pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: active ? 'var(--amber)' : 'var(--text-faint)',
              transition: 'color 0.15s',
              paddingTop: 6,
            }}
          >
            <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: 'var(--font-head)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
