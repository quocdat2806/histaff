import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { FontSize } from '@/constants/dimens';
import { Fonts } from '@/constants/fonts';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'body'
  | 'caption';

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse';
type TextWeight = 'bold' | 'semibold' | 'medium' | 'regular' | 'light' | 'thin' | 'black';

export interface AppTextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor | string;
  fontType?: TextWeight;
  children: React.ReactNode;

  center?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const colorMap: Record<TextColor, string> = {
  primary: Colors.black,
  secondary: Colors.secondaryGray,
  tertiary: Colors.darkGray,
  inverse: Colors.white,
};

export const AppText = React.memo<AppTextProps>(
  ({
    variant = 'body',
    color = 'primary',
    fontType = 'regular',
    center,
    bold,
    italic,
    underline,
    accessible = true,
    accessibilityRole,
    testID,
    style,
    children,
    ...rest
  }) => {
    const variantStyle = textVariantStyles[variant] ?? textVariantStyles.body;

    const colorStyle: TextStyle = {
      color: colorMap[color as TextColor] || color,
    };

    const fontWeightStyle = bold ? styles.bold : styles[fontType];

    const additionalStyles: TextStyle = {
      ...(center && { textAlign: 'center' }),
      ...(italic && { fontStyle: 'italic' }),
      ...(underline && { textDecorationLine: 'underline' }),
    };

    const defaultRole = variant.startsWith('h') ? 'header' : 'text';

    return (
      <RNText
        allowFontScaling={false}
        accessible={accessible}
        accessibilityRole={accessibilityRole || defaultRole}
        testID={testID || `text-${variant}`}
        style={[styles.base, variantStyle, colorStyle, fontWeightStyle, additionalStyles, style]}
        {...rest}
      >
        {children}
      </RNText>
    );
  }
);


const styles = StyleSheet.create({
  base: {
    fontSize: FontSize.body,
    lineHeight: FontSize.body * 1.8,
    fontFamily: Fonts.regular,
  },
  bold: {
    fontWeight: '700',
  },
  semibold: {
    fontWeight: '600',
  },
  medium: {
    fontWeight: '500',
  },
  regular: {
    fontWeight: '400',
  },
  light: {
    fontWeight: '300',
  },
  thin: {
    fontWeight: '100',
  },
  black: {
    fontWeight: '900',
  },
});

type VariantStyles = Record<TextVariant, TextStyle>;

const textVariantStyles: VariantStyles = {
  h1: {
    fontSize: FontSize.h1,
    lineHeight: FontSize.h1 * 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: FontSize.h2,
    lineHeight: FontSize.h2 * 1.2,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: FontSize.h3,
    lineHeight: FontSize.h3 * 1.3,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: FontSize.h4,
    lineHeight: FontSize.h4 * 1.3,
    letterSpacing: 0,
  },
  h5: {
    fontSize: FontSize.h5,
    lineHeight: FontSize.h5 * 1.3,
    letterSpacing: 0,
  },
  h6: {
    fontSize: FontSize.h6,
    lineHeight: FontSize.h6 * 1.3,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: FontSize.subtitle,
    lineHeight: FontSize.subtitle * 1.4,
    letterSpacing: 0,
  },
  body: {
    fontSize: FontSize.body,
    lineHeight: FontSize.body * 1.5,
    letterSpacing: 0,
  },
  caption: {
    fontSize: FontSize.caption,
    lineHeight: FontSize.caption * 1.4,
    letterSpacing: 0.2,
  },
};

export type { TextVariant, TextColor, TextWeight };

export const Heading1 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h1" fontType="bold" {...props} />
);

export const Heading2 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h2" fontType="bold" {...props} />
);

export const Heading3 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h3" fontType="semibold" {...props} />
);

export const Heading4 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h4" fontType="semibold" {...props} />
);

export const Heading5 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h5" {...props} />
);

export const Heading6 = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="h6" {...props} />
);

export const Subtitle = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="subtitle" {...props} />
);

export const BodyText = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="body" {...props} />
);

export const Caption = (props: Omit<AppTextProps, 'variant'>) => (
  <AppText variant="caption" color="secondary" {...props} />
);