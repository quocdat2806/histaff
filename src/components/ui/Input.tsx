import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppText } from './Text';
import { FontSize, Spacing, BorderRadius } from '@/constants/dimens';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
type InputVariant = 'outlined' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';
import { SvgShowPass, SvgHidePass } from '@assets/svgs';
export interface AppInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;

  error?: string;
  isError?: boolean;
  success?: boolean;
  helperText?: string;
  required?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;

  showPasswordToggle?: boolean;

  clearable?: boolean;
  onClear?: () => void;
  showCounter?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  loading?: boolean;

  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  lableColor?: string;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      label,
      placeholder,
      value = '',
      onChangeText,

      error,
      isError = false,
      success = false,
      helperText,
      required = false,

      leftIcon,
      rightIcon,
      onRightIconPress,

      showPasswordToggle = false,
      secureTextEntry = false,

      clearable = false,
      onClear,
      showCounter = false,
      maxLength,

      variant = 'outlined',
      size = 'md',
      disabled = false,
      loading = false,
      lableColor = Colors.black,

      containerStyle,
      inputContainerStyle,
      style,

      onFocus,
      onBlur,

      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const hasError = isError || !!error;
    const isDisabled = disabled || loading;

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      onChangeText?.('');
      onClear?.();
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    const getContainerStyle = (): ViewStyle => {
      const baseStyle =
        variant === 'outlined'
          ? {
              ...styles.inputContainerOutlined,
              ...AppStyles.f_Row,
              ...AppStyles.a_center,
            }
          : {
              ...styles.inputContainerFilled,
              ...AppStyles.f_Row,
              ...AppStyles.a_center,
            };

      const sizeStyle = sizeStyles[size];

      let stateStyle: ViewStyle = {};

      if (hasError) {
        stateStyle = styles.inputContainerError;
      } else if (success) {
        stateStyle = styles.inputContainerSuccess;
      } else if (isFocused) {
        stateStyle = styles.inputContainerFocused;
      }

      if (isDisabled) {
        stateStyle = { ...stateStyle, ...styles.inputContainerDisabled };
      }

      return { ...baseStyle, ...sizeStyle, ...stateStyle };
    };

    const showClearButton = clearable && value.length > 0 && !isDisabled;

    const showPasswordButton = showPasswordToggle && secureTextEntry;

    const characterCount = maxLength ? `${value.length}/${maxLength}` : null;

    return (
      <View style={[ containerStyle]}>
        {label && (
          <View style={styles.labelContainer}>
            <AppText color={lableColor} variant="body" fontType="medium">
              {label}
              {required && <AppText color="error"> *</AppText>}
            </AppText>
          </View>
        )}

        <View style={[getContainerStyle(), inputContainerStyle]}>
          {leftIcon && (
            <View
              style={[
                styles.leftIconContainer,
                AppStyles.a_center,
                AppStyles.j_center,
              ]}
            >
              {leftIcon}
            </View>
          )}

          <TextInput
            allowFontScaling={false}
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            editable={!isDisabled}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            style={[
              styles.input,
              inputSizeStyles[size],
              leftIcon ? styles.inputWithLeftIcon : undefined,
              showClearButton || showPasswordButton || rightIcon
                ? styles.inputWithRightIcon
                : undefined,
              style,
            ]}
            {...rest}
          />

          <View
            style={[
              styles.rightContainer,
              AppStyles.a_center,
              AppStyles.j_center,
            ]}
          >
            {showClearButton && (
              <TouchableOpacity
                onPress={handleClear}
                style={[
                  styles.iconButton,
                  AppStyles.a_center,
                  AppStyles.j_center,
                ]}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AppText>✕</AppText>
              </TouchableOpacity>
            )}

            {showPasswordButton && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={[
                  styles.iconButton,
                  AppStyles.a_center,
                  AppStyles.j_center,
                ]}
                hitSlop={10}
              >
                {isPasswordVisible ? <SvgShowPass /> : <SvgHidePass />}
              </TouchableOpacity>
            )}

            {rightIcon && (
              <TouchableOpacity
                onPress={onRightIconPress}
                style={[
                  styles.iconButton,
                  AppStyles.a_center,
                  AppStyles.j_center,
                ]}
                disabled={!onRightIconPress}
                hitSlop={10}
              >
                {rightIcon}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {(helperText || error || showCounter) && (
          <View
            style={[
              styles.bottomContainer,
              AppStyles.a_center,
              AppStyles.j_center,
            ]}
          >
            <View style={AppStyles.f_1}>
              {error && (
                <AppText variant="caption" color="error">
                  {error}
                </AppText>
              )}
              {!error && helperText && (
                <AppText variant="caption" color="secondary">
                  {helperText}
                </AppText>
              )}
            </View>

            {showCounter && characterCount && (
              <AppText variant="caption" color="secondary">
                {characterCount}
              </AppText>
            )}
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({

  labelContainer: {
    marginBottom: Spacing.xs,
  },

  inputContainerOutlined: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  inputContainerFilled: {
    borderRadius: BorderRadius.xl,
    borderWidth: 0,
    backgroundColor: Colors.inputBackground,
  },

  inputContainerFocused: {
    borderColor: Colors.border,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  inputContainerSuccess: {
    borderColor: Colors.success,
    borderWidth: 1,
  },
  inputContainerDisabled: {
    backgroundColor: Colors.disabled,
    opacity: 0.6,
  },

  input: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.black,
    padding: 0,
  },
  inputWithLeftIcon: {
    marginLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    marginRight: Spacing.xs,
  },

  leftIconContainer: {
    marginLeft: Spacing.md,
  },
  rightContainer: {
    marginRight: Spacing.md,
  },
  iconButton: {
    // padding: Spacing.xs,
  },

  bottomContainer: {
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.xs,
  },
});

const sizeStyles: Record<InputSize, ViewStyle> = {
  sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 52,
  },
};

const inputSizeStyles: Record<InputSize, TextStyle> = {
  sm: {
    fontSize: FontSize.caption,
  },
  md: {
    fontSize: FontSize.body,
  },
  lg: {
    fontSize: FontSize.subtitle,
  },
};
