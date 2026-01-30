const translationVi = {
  checkIn: 'Chấm công',
  contact: 'Liên hệ',
  home: 'Trang chủ',
  profile: 'Hồ sơ',
  notification: 'Thông báo',
  settings: 'Cài đặt',
  logout: 'Đăng xuất',
  login: 'Đăng nhập',
  register: 'Đăng ký',
  forgotPassword: 'Quên mật khẩu',
  resetPassword: 'Đặt lại mật khẩu',
  verifyEmail: 'Xác thực email',
  verifyPhone: 'Xác thực số điện thoại',
  homeScreenMessage: 'Trang chủ',
  contactScreenMessage: 'Liên hệ',
  checkInScreenMessage: 'Chấm công',
  notificationScreenMessage: 'Thông báo',
  profileScreenMessage: 'Hồ sơ',
  loginScreenMessage: 'Đăng nhập',
  inputCompanyCode: 'Vui lòng mã công ty để tiếp tục ',
  companyCode: 'Mã công ty',
  inputCompanyCodePlaceholder: 'Vui lòng nhập mã công ty',
  inputAccount: 'Tài khoản',
  inputAccountPlaceholder: 'Vui lòng nhập tài khoản',
  inputPassword: 'Mật khẩu',
  inputPasswordPlaceholder: 'Vui lòng nhập mật khẩu',
  loginWithOtherAccount: 'Đăng nhập bằng tài khoản khác',

} as const;

const translationEn = {
  checkIn: 'Check In',
  contact: 'Contact',
  home: 'Home',
  profile: 'Profile',
  notification: 'Notification',
  settings: 'Settings',
  logout: 'Logout',
  login: 'Login',
  register: 'Register',
  forgotPassword: 'Forgot password',
  resetPassword: 'Reset password',
  verifyEmail: 'Verify email',
  verifyPhone: 'Verify phone number',
  homeScreenMessage: 'Home Screen',
  contactScreenMessage: 'Contact Screen',
  checkInScreenMessage: 'Check In Screen',
  notificationScreenMessage: 'Notification Screen',
  profileScreenMessage: 'Profile Screen',
  loginScreenMessage: 'Login Screen',
  inputCompanyCode: 'Please enter company code to continue',
  companyCode: 'Company code',
  inputCompanyCodePlaceholder: 'Please enter company code',
  inputAccount: 'Account',
  inputAccountPlaceholder: 'Please enter account',
  inputPassword: 'Password',
  inputPasswordPlaceholder: 'Please enter password',
  loginWithOtherAccount: 'Login with other account',
} as const;

export const translations = {
  vi: translationVi,
  en: translationEn,
} as const;

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof (typeof translationVi);

export const languageDisplayNames: Record<LanguageCode, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const defaultLanguage: LanguageCode = 'vi';

export const getTexts = (language: LanguageCode) =>
  translations[language] ?? translations[defaultLanguage];

export const Texts = translations[defaultLanguage];