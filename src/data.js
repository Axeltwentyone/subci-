export const initialState = {
  // session / bootstrap
  authed: false,
  booting: true,

  // server-backed data, populated after login
  profileName: '',
  profilePhone: '',
  kycStatus: 'none',
  kycSessionPending: false,
  hostBalance: 0,
  rating: 0,
  transactionsCount: 0,
  listings: [],
  purchased: [],
  sold: [],
  notifications: [],
  withdrawals: [],

  // navigation / local UI
  tab: 'market',
  filter: 'Tous',
  searchQuery: '',
  selectedId: null,
  selectedPurchasedId: null,
  sortBy: 'default',
  hostMode: false,
  notifOpen: false,
  hostExpandedId: null,
  toast: null,

  // auth screen
  authScreen: 'login',
  loginId: '',
  loginPassword: '',
  signupName: '',
  signupId: '',
  signupPassword: '',

  // checkout
  checkoutOpen: false,
  checkoutStep: 1,
  paymentMethod: 'orange',
  phoneNumber: '',

  // sell / KYC form
  sellService: 'Netflix',
  sellPlan: '',
  sellSeats: 1,
  sellPrice: '',
  sellDesc: '',
  sellAccessLink: '',
  sellAccessEmail: '',
  sellAccessPassword: '',
  sellSubmitted: false,
  lastSellService: '',
  lastSellPlan: '',
  sellEditingId: null,
  kycName: '',

  // withdraw
  withdrawOpen: false,
  withdrawAmount: '',
  withdrawOperator: 'orange',
  withdrawPhone: '',

  // profile edit
  editProfileOpen: false,
  editProfileName: '',
  editProfilePhone: '',

  // rating
  ratingStars: 0,
  ratingComment: '',
};
