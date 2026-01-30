import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppText } from '../Text/Text';
import { Colors } from '@/constants/colors';
import { BorderRadius, FontSize, Spacing } from '@/constants/dimens';
import AppStyles from '@/style';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'style'> {
  label?: string;
  children?: React.ReactNode;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;

  fullWidth?: boolean;

  uppercase?: boolean;
  rounded?: boolean;

  style?: ViewStyle;
  textStyle?: TextStyle;

  onPress?: (event: GestureResponderEvent) => void;
}

export const AppButton = React.memo<AppButtonProps>(
  ({
    label,
    children,

    leftIcon,
    rightIcon,
    iconOnly = false,

    variant = 'primary',
    size = 'md',

    loading = false,
    loadingText,
    disabled = false,

    fullWidth = false,

    uppercase = false,
    rounded = false,

    style,
    textStyle: customTextStyle,

    onPress,

    ...rest
  }) => {
    const isDisabled = disabled || loading;

    const { containerStyle, textStyle, loaderColor } = getButtonStyles({
      variant,
      size,
      disabled: isDisabled,
      fullWidth,
      iconOnly,
      rounded,
    });

    const handlePress = (event: GestureResponderEvent) => {
      if (isDisabled) return;
      onPress?.(event);
    };

    const renderContent = () => {
      if (loading) {
        return (
          <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_center]}>
            <ActivityIndicator size="small" color={loaderColor} />
            {loadingText && (
              <AppText
                style={[styles.loadingText, textStyle, customTextStyle]}
              >
                {loadingText}
              </AppText>
            )}
          </View>
        );
      }

      return (
        <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_center]}>
          {leftIcon && !iconOnly && (
            <View style={styles.leftIconContainer}>
              {leftIcon}
            </View>
          )}

          {iconOnly && leftIcon && leftIcon}

          {!iconOnly && (label || children) && (
            <AppText
              center
              style={[
                styles.label,

                textStyle,
                uppercase && styles.uppercase,
                customTextStyle,
              ]}
              numberOfLines={1}
            >
              {label || children}
            </AppText>
          )}

          {rightIcon && !iconOnly && (
            <View style={styles.rightIconContainer}>
              {rightIcon}
            </View>
          )}
        </View>
      );
    };

    return (
      <Pressable
        disabled={isDisabled}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.base,
          AppStyles.f_Row,
          AppStyles.a_center,
          AppStyles.j_center,
          containerStyle,
          pressed && !isDisabled && styles.pressed,
          style,
        ]}
        android_ripple={{
          color: getRippleColor(variant),
          borderless: false,
        }}
        {...rest}
      >
        {renderContent()}
      </Pressable>
    );
  }
);



type SizeConfig = {
  minHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
};

const sizeMap: Record<ButtonSize, SizeConfig> = {
  sm: {
    minHeight: 36,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: FontSize.caption,
    iconSize: 16,
  },
  md: {
    minHeight: 44,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    fontSize: FontSize.body,
    iconSize: 20,
  },
  lg: {
    minHeight: 52,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    fontSize: FontSize.h5,
    iconSize: 24,
  },
};

type VariantConfig = {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
};

const variantMap: Record<ButtonVariant, VariantConfig> = {
  primary: {
    backgroundColor: Colors.primaryBlue,
    textColor: Colors.white,
    disabledBackgroundColor: Colors.disabled,
    disabledTextColor: Colors.primaryBlue,
  },
  secondary: {
    backgroundColor: Colors.secondaryGray,
    textColor: Colors.black,
    disabledBackgroundColor: Colors.disabled,
    disabledTextColor: Colors.disabled,
  },
  outline: {
    backgroundColor: 'transparent',
    textColor: Colors.primaryBlue,
    borderColor: Colors.primaryBlue,
    disabledBackgroundColor: 'transparent',
    disabledTextColor: Colors.disabled,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: Colors.primaryBlue,
    disabledBackgroundColor: 'transparent',
    disabledTextColor: Colors.disabled,
  },
  danger: {
    backgroundColor: Colors.error,
    textColor: Colors.white,
    disabledBackgroundColor: Colors.disabled,
    disabledTextColor: Colors.error,
  },
  success: {
    backgroundColor: Colors.success,
    textColor: Colors.white,
    disabledBackgroundColor: Colors.disabled,
    disabledTextColor: Colors.success,
  },
};


interface GetButtonStylesParams {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
  rounded: boolean;
}

const getButtonStyles = ({
  variant,
  size,
  disabled,
  fullWidth,
  iconOnly,
  rounded,
}: GetButtonStylesParams): {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
  loaderColor: string;
} => {
  const sizeConfig = sizeMap[size];
  const variantConfig = variantMap[variant];

  const containerStyle: ViewStyle = {
    minHeight: sizeConfig.minHeight,
    paddingVertical: sizeConfig.paddingVertical,
    paddingHorizontal: iconOnly ? sizeConfig.paddingVertical : sizeConfig.paddingHorizontal,
    backgroundColor: disabled
      ? variantConfig.disabledBackgroundColor || variantConfig.backgroundColor
      : variantConfig.backgroundColor,
  };

  if (variantConfig.borderColor) {
    containerStyle.borderColor = disabled ? Colors.border : variantConfig.borderColor;
    containerStyle.borderWidth = 1;
  }

  if (fullWidth) {
    containerStyle.width = '100%';
  }
  if (iconOnly) {
    containerStyle.width = sizeConfig.minHeight;
    containerStyle.aspectRatio = 1;
    containerStyle.paddingHorizontal = 0;
  }

  if (rounded) {
    containerStyle.borderRadius = 999;
  }

  const textStyle: TextStyle = {
    color: disabled
      ? variantConfig.disabledTextColor || variantConfig.textColor
      : variantConfig.textColor,
    fontSize: sizeConfig.fontSize,
    fontWeight: '600',
  };

  const loaderColor = disabled
    ? variantConfig.disabledTextColor || variantConfig.textColor
    : variantConfig.textColor;

  return { containerStyle, textStyle, loaderColor };
};

const getRippleColor = (variant: ButtonVariant): string => {
  const rippleColors: Record<ButtonVariant, string> = {
    primary: 'rgba(255, 255, 255, 0.3)',
    secondary: 'rgba(0, 0, 0, 0.1)',
    outline: 'rgba(0, 102, 204, 0.1)',
    ghost: 'rgba(0, 102, 204, 0.1)',
    danger: 'rgba(255, 255, 255, 0.3)',
    success: 'rgba(255, 255, 255, 0.3)',
  };
  return rippleColors[variant];
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },

  label: {
    letterSpacing: 0.5,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  leftIconContainer: {
    marginRight: Spacing.xs,
  },
  rightIconContainer: {
    marginLeft: Spacing.xs,
  },

  loadingText: {
    marginLeft: Spacing.sm,
  },
});

export const PrimaryButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="secondary" {...props} />
);

export const OutlineButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="outline" {...props} />
);

export const GhostButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="ghost" {...props} />
);

export const DangerButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="danger" {...props} />
);

export const SuccessButton = (props: Omit<AppButtonProps, 'variant'>) => (
  <AppButton variant="success" {...props} />
);

export const IconButton = (props: Omit<AppButtonProps, 'iconOnly'>) => (
  <AppButton iconOnly {...props} />
);