import { fmt } from './useMergeState.js';

export function deriveVals({ s, setState, showToast, api, applyUser, bootstrapAll, refreshListings, refreshMine, refreshMemberships, refreshWithdrawals, logout }) {
  const enrich = (l) => ({
    ...l,
    priceDisplay: fmt(l.price) + '/mois',
    seatsLabel: l.seatsLeft === 1 ? '1 place restante' : l.seatsLeft + ' places restantes',
    seatsBg: l.seatsLeft <= 1 ? '#F6E1E4' : '#F1F7F3',
    seatsFg: l.seatsLeft <= 1 ? '#7F011F' : '#1F8A5D',
    ratingLabel: l.rating.toFixed(1) + ' (' + l.sales + ')',
    letter: l.service[0],
    sellerInitial: l.seller[0],
    notVerified: !l.verified,
    hasReviews: !!(l.reviews && l.reviews.length),
    reviews: (l.reviews || []).map((rv) => ({ ...rv, starsLabel: '★'.repeat(rv.stars) })),
    onClick: () => setState({ selectedId: l.id }),
  });

  const allListings = s.listings.map(enrich);
  const q = s.searchQuery.trim().toLowerCase();
  const byFilter = s.filter === 'Tous' ? allListings : allListings.filter((l) => l.service === s.filter);
  let listingsOut = q ? byFilter.filter((l) => (l.service + ' ' + l.plan).toLowerCase().includes(q)) : byFilter;
  if (s.sortBy === 'priceAsc') listingsOut = [...listingsOut].sort((a, b) => a.price - b.price);
  if (s.sortBy === 'seats') listingsOut = [...listingsOut].sort((a, b) => b.seatsLeft - a.seatsLeft);

  const filterNames = ['Tous', 'Netflix', 'Spotify', 'Canal+', 'YouTube', 'Disney+', 'Apple TV+'];
  const filters = filterNames.map((name) => ({
    name,
    bg: name === s.filter ? '#7F011F' : '#FFFFFF',
    fg: name === s.filter ? '#FFFFFF' : '#1C1B1F',
    border: name === s.filter ? '#7F011F' : '#E8DCC0',
    onClick: () => setState({ filter: name }),
  }));

  const selected = s.selectedId ? enrich(s.listings.find((l) => l.id === s.selectedId)) : null;

  const linkServices = ['Spotify', 'YouTube Premium', 'Apple TV+'];
  const sellIsLink = linkServices.includes(s.sellService);
  const sellIsCredentials = !sellIsLink;
  const sellAccessValid = sellIsLink ? s.sellAccessLink.trim().length > 3 : (s.sellAccessEmail.trim().length > 3 && s.sellAccessPassword.trim().length > 0);
  const sellValid = s.sellPlan.trim().length > 0 && Number(s.sellPrice) > 0 && Number(s.sellSeats) > 0 && sellAccessValid;
  const phoneValid = s.phoneNumber.replace(/\D/g, '').length >= 8;

  const profileTabDefs = [{ id: 'achats', label: 'Mes achats' }, { id: 'ventes', label: 'Mes ventes' }, { id: 'historique', label: 'Historique' }];
  const profileTabs = profileTabDefs.map((t) => ({
    ...t,
    bg: t.id === s.profileTab ? '#7F011F' : '#FFFFFF',
    fg: t.id === s.profileTab ? '#FFFFFF' : '#1C1B1F',
    onClick: () => setState({ profileTab: t.id }),
  }));

  const paymentDefs = [
    { id: 'orange', name: 'Orange Money', badge: 'OM', color: '#FF6600' },
    { id: 'mtn', name: 'MTN MoMo', badge: 'MTN', color: '#FFCC00' },
    { id: 'moov', name: 'Moov Money', badge: 'Moov', color: '#0033A0' },
  ];
  const paymentMethods = paymentDefs.map((m) => ({
    ...m,
    active: m.id === s.paymentMethod,
    bg: m.id === s.paymentMethod ? '#F6E1E4' : '#FFFFFF',
    border: m.id === s.paymentMethod ? '#7F011F' : '#E8DCC0',
    dotBorder: m.id === s.paymentMethod ? '#7F011F' : '#D9CBA0',
    onClick: () => setState({ paymentMethod: m.id }),
  }));

  const activeCount = s.purchased.length;
  const monthlySpend = s.purchased.reduce((a, p) => a + p.price, 0);
  const salesCount = s.sold.reduce((a, v) => a + v.ventes, 0);

  const fail = (e) => showToast(e.message || 'Une erreur est survenue.');

  return {
    activeCount, monthlySpendDisplay: fmt(monthlySpend), salesCount,
    goBrowse: () => setState({ tab: 'browse' }),
    hasActive: s.purchased.length > 0,
    isHostEligible: s.kycStatus === 'verified',
    buyerModeBg: !s.hostMode ? '#7F011F' : 'transparent',
    buyerModeFg: !s.hostMode ? '#F5EBD0' : '#5A564C',
    hostModeBg: s.hostMode ? '#7F011F' : 'transparent',
    hostModeFg: s.hostMode ? '#F5EBD0' : '#5A564C',
    toggleHostMode: () => {
      const next = !s.hostMode;
      setState(next ? { hostMode: true, tab: 'profile', profileTab: 'ventes' } : { hostMode: false, tab: 'market' });
    },
    isMarket: s.tab === 'market', isBrowse: s.tab === 'browse', isSell: s.tab === 'sell',
    isProfile: s.tab === 'profile' && !s.hostMode,
    isHostView: s.tab === 'profile' && s.hostMode,
    showBack: s.tab !== 'market',
    goMarket: () => setState({ tab: 'market' }),
    goSell: () => setState({ tab: 'sell', sellSubmitted: false, sellEditingId: null, sellPlan: '', sellPrice: '', sellSeats: 1, sellDesc: '' }),
    goProfile: () => setState({ tab: 'profile', hostMode: false }),
    marketColor: s.tab === 'market' ? '#7F011F' : '#8A8578',
    sellColor: s.tab === 'sell' ? '#7F011F' : '#8A8578',
    profileColor: s.tab === 'profile' ? '#7F011F' : '#8A8578',
    ventesColor: s.tab === 'profile' && s.hostMode ? '#7F011F' : '#8A8578',

    notAuthed: !s.authed,
    isLoginScreen: s.authScreen === 'login', isSignupScreen: s.authScreen === 'signup',
    goLoginScreen: () => setState({ authScreen: 'login' }),
    goSignupScreen: () => setState({ authScreen: 'signup' }),
    loginTabBg: s.authScreen === 'login' ? '#F5EBD0' : 'transparent',
    loginTabFg: s.authScreen === 'login' ? '#7F011F' : '#F5EBD0',
    signupTabBg: s.authScreen === 'signup' ? '#F5EBD0' : 'transparent',
    signupTabFg: s.authScreen === 'signup' ? '#7F011F' : '#F5EBD0',
    loginId: s.loginId,
    setLoginId: (e) => setState({ loginId: e.target.value }),
    loginPassword: s.loginPassword,
    setLoginPassword: (e) => setState({ loginPassword: e.target.value }),
    login: async () => {
      try {
        const { user, token } = await api.login({ email: s.loginId, password: s.loginPassword });
        applyUser(user, token);
        await bootstrapAll();
      } catch (e) { fail(e); }
    },
    signupName: s.signupName,
    setSignupName: (e) => setState({ signupName: e.target.value }),
    signupId: s.signupId,
    setSignupId: (e) => setState({ signupId: e.target.value }),
    signupPassword: s.signupPassword,
    setSignupPassword: (e) => setState({ signupPassword: e.target.value }),
    signup: async () => {
      try {
        const { user, token } = await api.register({ name: s.signupName, email: s.signupId, password: s.signupPassword });
        applyUser(user, token);
        await bootstrapAll();
      } catch (e) { fail(e); }
    },

    notifOpen: s.notifOpen,
    toggleNotif: () => setState((prev) => ({ notifOpen: !prev.notifOpen })),
    hasUnread: s.notifications.some((n) => !n.read),
    notifications: s.notifications,
    goVentes: () => setState({ tab: 'profile', profileTab: 'ventes', hostMode: true }),

    searchQuery: s.searchQuery,
    setSearchQuery: (e) => setState({ searchQuery: e.target.value }),
    filters, listings: listingsOut, noResults: listingsOut.length === 0,
    sortOptions: [{ id: 'default', name: 'Pertinence' }, { id: 'priceAsc', name: 'Prix croissant' }, { id: 'seats', name: 'Plus de places' }].map((o) => ({
      ...o,
      bg: o.id === s.sortBy ? '#7F011F' : '#FFFFFF',
      fg: o.id === s.sortBy ? '#F5EBD0' : '#5A564C',
      border: o.id === s.sortBy ? '#7F011F' : '#E8DCC0',
      onClick: () => setState({ sortBy: o.id }),
    })),

    selected,
    closeDetail: () => setState({ selectedId: null }),
    startCheckout: () => setState({ checkoutOpen: true, checkoutStep: 1 }),
    checkoutOpen: s.checkoutOpen,
    closeCheckout: () => setState({ checkoutOpen: false }),
    checkoutStep: s.checkoutStep,
    step1: s.checkoutStep === 1, step2: s.checkoutStep === 2, step3: s.checkoutStep === 3,
    dot1: '#7F011F', dot2: s.checkoutStep >= 2 ? '#7F011F' : '#E8DCC0', dot3: s.checkoutStep >= 3 ? '#7F011F' : '#E8DCC0',
    goStep2: () => setState({ checkoutStep: 2 }),
    paymentMethods,
    phoneNumber: s.phoneNumber,
    setPhoneNumber: (e) => setState({ phoneNumber: e.target.value }),
    payDisabled: !phoneValid,
    payBtnBg: phoneValid ? '#7F011F' : '#D9CBA0',
    payBtnOpacity: phoneValid ? 1 : 0.7,
    confirmPayment: async () => {
      if (!selected || !phoneValid) return;
      try {
        await api.purchase({ listingId: Number(selected.id), phoneNumber: s.phoneNumber });
        setState({ checkoutStep: 3 });
        refreshMemberships();
      } catch (e) { fail(e); }
    },
    finishCheckout: () => {
      setState({ checkoutOpen: false, selectedId: null, tab: 'profile', profileTab: 'achats', phoneNumber: '' });
      showToast('Paiement réussi ✓');
      refreshListings();
    },

    serviceOptions: ['Netflix', 'Spotify', 'Canal+', 'YouTube Premium', 'Disney+', 'Apple TV+', 'Autre'],
    sellService: s.sellService,
    setSellService: (e) => setState({ sellService: e.target.value }),
    sellPlan: s.sellPlan,
    setSellPlan: (e) => setState({ sellPlan: e.target.value }),
    sellSeats: s.sellSeats,
    setSellSeats: (e) => setState({ sellSeats: e.target.value }),
    sellPrice: s.sellPrice,
    setSellPrice: (e) => setState({ sellPrice: e.target.value }),
    sellDesc: s.sellDesc,
    setSellDesc: (e) => setState({ sellDesc: e.target.value }),
    sellIsLink, sellIsCredentials,
    sellAccessLink: s.sellAccessLink,
    setSellAccessLink: (e) => setState({ sellAccessLink: e.target.value }),
    sellAccessEmail: s.sellAccessEmail,
    setSellAccessEmail: (e) => setState({ sellAccessEmail: e.target.value }),
    sellAccessPassword: s.sellAccessPassword,
    setSellAccessPassword: (e) => setState({ sellAccessPassword: e.target.value }),
    sellDisabled: !sellValid,
    sellBtnBg: sellValid ? '#7F011F' : '#D9CBA0',
    sellBtnOpacity: sellValid ? 1 : 0.7,
    sellNotSubmitted: !s.sellSubmitted,
    sellSubmitted: s.sellSubmitted,
    lastSellService: s.lastSellService, lastSellPlan: s.lastSellPlan,
    kycNeeded: s.kycStatus === 'none',
    kycCheckingSub: s.kycStatus === 'checkingSub',
    kycVerifiedAndSelling: s.kycStatus === 'verified',
    subCheckDisabled: !sellAccessValid,
    subCheckBtnBg: sellAccessValid ? '#7F011F' : '#D9CBA0',
    subCheckBtnOpacity: sellAccessValid ? 1 : 0.7,
    verifySubscription: async () => {
      if (!sellAccessValid) return;
      try {
        const { user } = await api.verifySubscription();
        applyUser(user);
        showToast('Abonnement vérifié ✓');
      } catch (e) { fail(e); }
    },
    kycName: s.kycName,
    kycSessionPending: s.kycSessionPending,
    startKycVerification: async () => {
      try {
        const callback = window.location.origin + window.location.pathname + '?kyc=1';
        const { url } = await api.startKyc({ callback });
        window.location.href = url;
      } catch (e) { fail(e); }
    },
    checkKycVerification: async () => {
      try {
        const { user, status } = await api.checkKyc();
        applyUser(user);
        if (status === 'Approved') showToast('Identité vérifiée ✓');
        else if (['Declined', 'Expired', 'Kyc Expired', 'Abandoned'].includes(status)) showToast('Vérification refusée, réessaie.');
        else showToast('Vérification en cours de traitement...');
      } catch (e) { fail(e); }
    },
    isEditingSell: !!s.sellEditingId,
    sellHeading: s.sellEditingId ? "Modifier l'annonce" : 'Créer ton cercle',
    sellSubmitLabel: s.sellEditingId ? 'Enregistrer les modifications' : 'Créer mon cercle',
    submitSell: async () => {
      if (!sellValid) return;
      const payload = {
        service: s.sellService,
        plan: s.sellPlan,
        price: Number(s.sellPrice),
        seats: Number(s.sellSeats),
        accessType: sellIsLink ? 'link' : 'credentials',
        accessLink: sellIsLink ? s.sellAccessLink : null,
        accessEmail: sellIsCredentials ? s.sellAccessEmail : null,
        accessPassword: sellIsCredentials ? s.sellAccessPassword : null,
        description: s.sellDesc || null,
      };
      try {
        if (s.sellEditingId) {
          await api.updateListing(s.sellEditingId, payload);
          await refreshMine();
          setState({
            sellEditingId: null, sellPlan: '', sellPrice: '', sellSeats: 1, sellDesc: '',
            sellAccessLink: '', sellAccessEmail: '', sellAccessPassword: '',
            tab: 'profile', profileTab: 'ventes',
          });
          showToast('Annonce mise à jour ✓');
          return;
        }
        await api.createListing(payload);
        await refreshMine();
        setState({ sellSubmitted: true, lastSellService: s.sellService, lastSellPlan: s.sellPlan, sellAccessLink: '', sellAccessEmail: '', sellAccessPassword: '' });
      } catch (e) { fail(e); }
    },
    newListing: () => setState({ sellSubmitted: false, sellPlan: '', sellPrice: '', sellSeats: 1, sellDesc: '' }),
    goToVentes: () => setState({ sellSubmitted: false, tab: 'profile', profileTab: 'ventes' }),
    noSales: s.sold.length === 0,

    profileTabs, showAchats: s.profileTab === 'achats', showVentes: s.profileTab === 'ventes', showHistorique: s.profileTab === 'historique',
    noActive: s.purchased.length === 0,
    goBrowseFromProfile: () => setState({ tab: 'browse' }),
    purchasedDisplay: s.purchased.map((p) => ({ ...p, priceDisplay: fmt(p.price) + '/mois', letter: p.service[0], onClick: () => setState({ selectedPurchasedId: p.id }) })),
    selectedPurchased: s.selectedPurchasedId ? (() => { const p = s.purchased.find((x) => x.id === s.selectedPurchasedId); return p ? { ...p, priceDisplay: fmt(p.price) + '/mois', letter: p.service[0], isCredentials: p.accessType === 'credentials', isLink: p.accessType === 'link', hasRated: p.sellerRating != null, notRated: p.sellerRating == null, ratedStarsLabel: p.sellerRating ? '★'.repeat(p.sellerRating) : '' } : null; })() : null,
    closePurchasedDetail: () => setState({ selectedPurchasedId: null }),
    ratingStars: s.ratingStars,
    setRatingStars: (n) => setState({ ratingStars: n }),
    ratingComment: s.ratingComment,
    setRatingComment: (e) => setState({ ratingComment: e.target.value }),
    ratingStarsDisplay: [1, 2, 3, 4, 5].map((n) => ({ n, filled: n <= s.ratingStars ? '#B8790A' : '#E8DCC0', onClick: () => setState({ ratingStars: n }) })),
    submitRating: async () => {
      if (!s.selectedPurchasedId || s.ratingStars === 0) return;
      try {
        await api.rateMembership(s.selectedPurchasedId, { stars: s.ratingStars, comment: s.ratingComment || null });
        await refreshMemberships();
        setState({ ratingStars: 0, ratingComment: '' });
        showToast('Avis envoyé, merci !');
      } catch (e) { fail(e); }
    },
    copyEmail: () => { const p = s.purchased.find((x) => x.id === s.selectedPurchasedId); if (navigator.clipboard && p) navigator.clipboard.writeText(p.accessEmail || '').catch(() => {}); showToast('Email copié ✓'); },
    copyPassword: () => { const p = s.purchased.find((x) => x.id === s.selectedPurchasedId); if (navigator.clipboard && p) navigator.clipboard.writeText(p.accessPassword || '').catch(() => {}); showToast('Mot de passe copié ✓'); },
    copyLink: () => { const p = s.purchased.find((x) => x.id === s.selectedPurchasedId); if (navigator.clipboard && p) navigator.clipboard.writeText(p.accessLink || '').catch(() => {}); showToast('Lien copié ✓'); },
    contactSeller: () => showToast('Message envoyé au vendeur'),
    cancelSubscription: async () => {
      if (!s.selectedPurchasedId) return;
      try {
        await api.cancelMembership(s.selectedPurchasedId);
        await refreshMemberships();
        setState({ selectedPurchasedId: null });
        showToast('Abonnement annulé');
      } catch (e) { fail(e); }
    },
    soldDisplay: s.sold.map((v) => ({
      ...v, priceDisplay: fmt(v.price) + '/mois', letter: v.service[0], ventesLabel: v.ventes + (v.ventes === 1 ? ' vente' : ' ventes'),
      seatsLabel: v.ventes + '/' + (v.seats || v.ventes) + ' places occupées',
      fillPct: Math.round((v.ventes / (v.seats || v.ventes || 1)) * 100),
      isFull: v.ventes >= (v.seats || v.ventes),
      isLastSeat: (v.seats || v.ventes) - v.ventes === 1,
      revenueDisplay: fmt(v.price * v.ventes) + '/mois',
      members: (v.members || []).map((m) => ({ ...m, dotColor: m.paymentStatus === 'failed' ? '#B8790A' : '#1F8A5D' })),
      onShareInvite: () => { if (navigator.clipboard) navigator.clipboard.writeText('https://sub.ci/join/' + v.id).catch(() => {}); showToast('Lien du cercle copié ✓'); },
      expanded: s.hostExpandedId === v.id,
      membersToggleLabel: s.hostExpandedId === v.id ? 'Masquer les membres' : 'Voir les membres',
      onToggleExpand: () => setState((prev) => ({ hostExpandedId: prev.hostExpandedId === v.id ? null : v.id })),
      onEdit: () => setState({ sellEditingId: v.id, sellService: v.service, sellPlan: v.plan, sellPrice: String(v.price), sellSeats: v.seats || 1, sellDesc: '', sellAccessLink: v.accessLink || '', sellAccessEmail: v.accessEmail || '', sellAccessPassword: v.accessPassword || '', tab: 'sell' }),
      onDelete: async () => {
        try {
          await api.deleteListing(v.id);
          await refreshMine();
          showToast('Cercle supprimé');
        } catch (e) { fail(e); }
      },
    })),
    hostRevenueDisplay: fmt(s.sold.reduce((a, v) => a + v.price * v.ventes, 0)),
    hostCirclesCount: s.sold.length,
    hostMembersCount: s.sold.reduce((a, v) => a + v.ventes, 0),
    hostBalanceDisplay: fmt(s.hostBalance),
    openWithdraw: () => setState({ withdrawOpen: true }),
    closeWithdraw: () => setState({ withdrawOpen: false }),
    withdrawOpen: s.withdrawOpen,
    withdrawAmount: s.withdrawAmount,
    setWithdrawAmount: (e) => setState({ withdrawAmount: e.target.value }),
    withdrawPhone: s.withdrawPhone,
    setWithdrawPhone: (e) => setState({ withdrawPhone: e.target.value }),
    withdrawOperators: [
      { id: 'orange', name: 'Orange Money', badge: 'OM', color: '#FF6600' },
      { id: 'mtn', name: 'MTN MoMo', badge: 'MTN', color: '#FFCC00' },
      { id: 'moov', name: 'Moov Money', badge: 'Moov', color: '#0033A0' },
    ].map((m) => ({
      ...m, active: m.id === s.withdrawOperator,
      bg: m.id === s.withdrawOperator ? '#FFF4F1' : '#FFFFFF',
      border: m.id === s.withdrawOperator ? '#7F011F' : '#E8DCC0',
      dotBorder: m.id === s.withdrawOperator ? '#7F011F' : '#D9CBA0',
      onClick: () => setState({ withdrawOperator: m.id }),
    })),
    withdrawDisabled: !(Number(s.withdrawAmount) > 0 && Number(s.withdrawAmount) <= s.hostBalance && s.withdrawPhone.replace(/\D/g, '').length >= 8),
    withdrawBtnBg: (Number(s.withdrawAmount) > 0 && Number(s.withdrawAmount) <= s.hostBalance && s.withdrawPhone.replace(/\D/g, '').length >= 8) ? '#7F011F' : '#D9CBA0',
    submitWithdraw: async () => {
      const amt = Number(s.withdrawAmount);
      if (!(amt > 0 && amt <= s.hostBalance && s.withdrawPhone.replace(/\D/g, '').length >= 8)) return;
      try {
        await api.withdraw({ amount: amt, operator: s.withdrawOperator, phone: s.withdrawPhone });
        await refreshWithdrawals();
        setState((prev) => ({ hostBalance: prev.hostBalance - amt, withdrawOpen: false, withdrawAmount: '', withdrawPhone: '' }));
        showToast('Retrait envoyé ✓');
      } catch (e) { fail(e); }
    },
    profileName: s.profileName, profileName0: s.profileName ? s.profileName[0] : '',
    rating: s.rating, transactionsCount: s.transactionsCount,
    logout,
    openEditProfile: () => setState({ editProfileOpen: true, editProfileName: s.profileName, editProfilePhone: s.profilePhone }),
    closeEditProfile: () => setState({ editProfileOpen: false }),
    editProfileOpen: s.editProfileOpen,
    editProfileName: s.editProfileName, setEditProfileName: (e) => setState({ editProfileName: e.target.value }),
    editProfilePhone: s.editProfilePhone, setEditProfilePhone: (e) => setState({ editProfilePhone: e.target.value }),
    saveProfile: async () => {
      try {
        const { user } = await api.updateProfile({ name: s.editProfileName || s.profileName, phone: s.editProfilePhone || null });
        applyUser(user);
        setState({ editProfileOpen: false });
        showToast('Profil mis à jour ✓');
      } catch (e) { fail(e); }
    },
    downloadReceipt: () => showToast('Reçu téléchargé (PDF)'),
    hasWithdrawals: s.withdrawals.length > 0,
    withdrawalsDisplay: s.withdrawals.map((w) => ({ ...w, amountDisplay: fmt(w.amount), onReceipt: () => showToast('Reçu téléchargé (PDF)') })),
    hostAlerts: s.sold.flatMap((v) => (v.members || []).filter((m) => m.paymentStatus === 'failed').map((m) => ({ text: m.name + ' — paiement en échec pour ' + v.service + ' (' + v.plan + ')' }))),
    hasHostAlerts: s.sold.some((v) => (v.members || []).some((m) => m.paymentStatus === 'failed')),
    historyDisplay: [
      ...s.purchased.map((p) => ({ label: 'Achat · ' + p.service + ' — ' + p.plan, date: p.until, amountLabel: '-' + fmt(p.price), amountColor: '#7F011F', iconBg: '#F6E1E4', iconColor: '#7F011F', iconPath: 'M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z' })),
      ...s.sold.map((v) => ({ label: 'Vente · ' + v.service + ' — ' + v.plan, date: v.ventes + (v.ventes === 1 ? ' vente' : ' ventes'), amountLabel: '+' + fmt(v.price), amountColor: '#1F8A5D', iconBg: '#F1F7F3', iconColor: '#1F8A5D', iconPath: 'M12 5v14M5 12h14' })),
    ],

    toast: s.toast,
  };
}
