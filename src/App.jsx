import { useEffect, useRef } from 'react';
import { useMergeState } from './useMergeState.js';
import { initialState } from './data.js';
import { deriveVals } from './derive.js';
import { api, getToken, setToken } from './api.js';

import Auth from './screens/Auth.jsx';
import Market from './screens/Market.jsx';
import Browse from './screens/Browse.jsx';
import Sell from './screens/Sell.jsx';
import HostView from './screens/HostView.jsx';
import Profile from './screens/Profile.jsx';
import ListingDetail from './screens/ListingDetail.jsx';
import PurchasedDetail from './screens/PurchasedDetail.jsx';
import Checkout from './screens/Checkout.jsx';
import Withdraw from './screens/Withdraw.jsx';
import EditProfile from './screens/EditProfile.jsx';
import BottomNav from './components/BottomNav.jsx';
import NotifPanel from './components/NotifPanel.jsx';
import Toast from './components/Toast.jsx';
import BackIcon from './components/BackIcon.jsx';
import BellIcon from './components/BellIcon.jsx';

export default function App() {
  const [s, setState] = useMergeState(initialState);
  const toastTimer = useRef(null);
  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setState({ toast: msg });
    toastTimer.current = setTimeout(() => setState({ toast: null }), 2600);
  };

  const applyUser = (user, token) => {
    if (token) setToken(token);
    setState({
      authed: true,
      booting: false,
      profileName: user.name,
      profilePhone: user.phone || '',
      kycStatus: user.kycStatus,
      kycSessionPending: !!user.kycSessionPending,
      kycName: user.kycName || '',
      hostBalance: user.hostBalance,
      rating: user.rating,
      transactionsCount: user.transactionsCount,
    });
  };

  const refreshListings = async () => setState({ listings: (await api.listings()).data });
  const refreshMine = async () => setState({ sold: (await api.myListings()).data });
  const refreshMemberships = async () => setState({ purchased: (await api.myMemberships()).data });
  const refreshNotifications = async () => setState({ notifications: (await api.notifications()).data });
  const refreshWithdrawals = async () => setState({ withdrawals: (await api.withdrawals()).data });

  const bootstrapAll = () => Promise.all([
    refreshListings(), refreshMine(), refreshMemberships(), refreshNotifications(), refreshWithdrawals(),
  ]);

  const logout = async () => {
    try { await api.logout(); } catch { /* token may already be invalid — log out locally regardless */ }
    setToken(null);
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (!getToken()) {
        setState({ booting: false });
        return;
      }
      try {
        const { user } = await api.me();
        applyUser(user);
        await bootstrapAll();

        if (new URLSearchParams(window.location.search).get('kyc') === '1') {
          window.history.replaceState(null, '', window.location.pathname);
          setState({ tab: 'sell' });
          try {
            const { user: refreshed, status } = await api.checkKyc();
            applyUser(refreshed);
            if (status === 'Approved') showToast('Identité vérifiée ✓');
            else if (['Declined', 'Expired', 'Kyc Expired', 'Abandoned'].includes(status)) showToast('Vérification refusée, réessaie.');
            else showToast('Vérification en cours de traitement...');
          } catch { /* best-effort */ }
        }
      } catch {
        setToken(null);
        setState({ booting: false, authed: false });
      }
    })();
  }, []);

  const v = deriveVals({ s, setState, showToast, api, applyUser, bootstrapAll, refreshListings, refreshMine, refreshMemberships, refreshWithdrawals, logout });

  if (s.booting) {
    return <div className="app-shell" style={{ background: '#F5EBD0' }} />;
  }

  return (
    <div className="app-shell" style={{
      display: 'flex', flexDirection: 'column',
      background: '#F5EBD0', fontFamily: "'Manrope',sans-serif", color: '#1C1B1F',
    }}>
      {v.notAuthed && <Auth v={v} />}

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', paddingBottom: 100 }}>
        <div style={{ padding: 'calc(20px + env(safe-area-inset-top, 0px)) 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
          {v.isMarket && (
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.4px' }}>
              sub<span style={{ color: '#7F011F' }}>.ci</span>
            </div>
          )}
          {v.showBack && (
            <div onClick={v.goMarket} style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <BackIcon />
            </div>
          )}
          <div onClick={v.goProfile} style={{ width: 38, height: 38, borderRadius: '50%', background: '#7F011F', color: '#F5EBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            {v.profileName0}
          </div>
        </div>

        {v.isMarket && (
          <div style={{ position: 'absolute', top: 'calc(20px + env(safe-area-inset-top, 0px))', right: 64, zIndex: 5 }}>
            <div onClick={v.toggleNotif} style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E8DCC0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <BellIcon />
              {v.hasUnread && (
                <div style={{ position: 'absolute', top: 6, right: 7, width: 8, height: 8, borderRadius: '50%', background: '#7F011F', border: '1.5px solid #FFFFFF' }} />
              )}
            </div>
          </div>
        )}

        {v.notifOpen && <NotifPanel v={v} />}

        {v.isMarket && <Market v={v} />}
        {v.isBrowse && <Browse v={v} />}
        {v.isSell && <Sell v={v} />}
        {v.isHostView && <HostView v={v} />}
        {v.isProfile && <Profile v={v} />}
      </div>

      <BottomNav v={v} />

      {v.selectedPurchased && <PurchasedDetail v={v} />}
      {v.selected && <ListingDetail v={v} />}
      {v.checkoutOpen && <Checkout v={v} />}
      {v.withdrawOpen && <Withdraw v={v} />}
      {v.editProfileOpen && <EditProfile v={v} />}

      {v.toast && <Toast text={v.toast} />}
    </div>
  );
}
