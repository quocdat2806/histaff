import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

export const Spacing = {
  xxs: scale(4),
  xs: scale(8),
  sm: scale(10),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  xxxl: scale(28),
  xxxxl: scale(32),
  xxxxxl: scale(36),
  xxxxxxl: scale(40),
};

export const FontSize = {
  h1: scale(32),
  h2: scale(28),
  h3: scale(24),
  h4: scale(20),
  h5: scale(18),
  h6: scale(14),
  subtitle: scale(12),
  body: scale(16),
  caption: scale(10),
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  xl: 12,
  xxl: 16,
  xxxl: 20,
  xxxxl: 24,
  xxxxxl: 28,
  xxxxxxl: 32,
  rounded: 9999,
};

export const IconSize = {
  sm: 24,
  md: 32,
};

export const Layout = {
  tabBarHeight: 80,
  buttonMaxWidth: 200,
  avatarSizeDefault: 48,
  avatarSizeLarge: 58,
};
export const Width = {
  modalWidth: 320,
  fullWidth: '100%',
  fullHeight: '100%',
  fullScreenDimensionWidth: Dimensions.get('window').width,
  fullScreenDimensionHeight: Dimensions.get('window').height,
};
