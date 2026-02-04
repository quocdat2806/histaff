import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppText } from './Text';
import { Colors } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/dimens';
import AppStyles from '@/style';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

export interface AppButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
}

const DEFAULT_VARIANT: ButtonVariant = 'primary';

type SizeConfig = {
  minHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
};

const sizeConfig: SizeConfig = {
  minHeight: 44,
  paddingVertical: Spacing.sm,
  paddingHorizontal: Spacing.xl,
  fontSize: FontSize.body,
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

export const AppButton = React.memo<AppButtonProps>(
  ({
    label,
    disabled = false,
    loading = false,
    icon,
    variant = DEFAULT_VARIANT,
    fullWidth = false,
    style,
    textStyle: customTextStyle,
    onPress,
    textColor,
    ...rest
  }) => {
    const isDisabled = disabled || loading;
    const iconOnly = Boolean(icon && !label);

    const v = variantMap[variant];
    const containerStyle: ViewStyle = {
      minHeight: sizeConfig.minHeight,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: iconOnly
        ? sizeConfig.paddingVertical
        : sizeConfig.paddingHorizontal,
      backgroundColor: isDisabled
        ? v.disabledBackgroundColor ?? v.backgroundColor
        : v.backgroundColor,
    };
    if (v.borderColor) {
      containerStyle.borderWidth = 1;
      containerStyle.borderColor = isDisabled ? Colors.border : v.borderColor;
    }
    if (fullWidth) containerStyle.width = '100%';
    if (iconOnly) {
      containerStyle.width = sizeConfig.minHeight;
      containerStyle.aspectRatio = 1;
      containerStyle.paddingHorizontal = 0;
    }

    const textStyle: TextStyle = {
      color: isDisabled ? v.disabledTextColor ?? v.textColor : v.textColor,
      fontSize: sizeConfig.fontSize,
      fontWeight: '600',
    };
    const loaderColor = isDisabled
      ? v.disabledTextColor ?? v.textColor
      : v.textColor;

    const handlePress = (e: GestureResponderEvent) => {
      if (isDisabled) return;
      onPress?.(e);
    };

    const content = loading ? (
      <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_center]}>
        <ActivityIndicator size="small" color={loaderColor} />
      </View>
    ) : (
      <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_center]}>
        {icon &&
          (iconOnly ? (
            icon
          ) : (
            <View style={AppStyles.marginRight8}>{icon}</View>
          ))}
        {label != null && label !== '' && (
          <AppText
            color={textColor}
            center
            style={[textStyle, customTextStyle]}
            numberOfLines={1}
          >
            {label}
          </AppText>
        )}
      </View>
    );

    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={handlePress}
        style={[
          styles.base,
          AppStyles.borderRadius12,
          AppStyles.f_Row,
          AppStyles.a_center,
          AppStyles.j_center,
          containerStyle,
          style,
        ]}
        {...rest}
      >
        {content}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
