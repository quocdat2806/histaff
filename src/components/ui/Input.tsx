import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppText } from './Text';
import { FontSize, } from '@/constants/dimens';
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
  labelColor?: string;
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
      labelColor = Colors.black,

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
              ...AppStyles.borderDefault,
              ...AppStyles.border1,
             ...AppStyles.borderRadius12,
             ...AppStyles.backGroundWhite,
              ...AppStyles.f_Row,
              ...AppStyles.a_center,
            }
          : {
              ...AppStyles.border0,
              ...AppStyles.borderRadius12,
              ...AppStyles.backGroundInput,
              ...AppStyles.f_Row,
              ...AppStyles.a_center,
            };

      const sizeStyle = sizeStyles[size];

      let stateStyle: ViewStyle = {};

      if (hasError) {
        stateStyle = { ...AppStyles.borderError, ...AppStyles.border1 };
      } else if (success) {
        stateStyle = { ...AppStyles.borderSuccess, ...AppStyles.border1 };
      } else if (isFocused) {
        stateStyle = { ...AppStyles.borderDefault, ...AppStyles.border2 };
      }

      if (isDisabled) {
        stateStyle = { ...stateStyle, ...AppStyles.backGroundDisabled, ...AppStyles.opacity06 };
      }

      return { ...baseStyle, ...sizeStyle, ...stateStyle };
    };

    const showClearButton = clearable && value.length > 0 && !isDisabled;

    const showPasswordButton = showPasswordToggle && secureTextEntry;

    const characterCount = maxLength ? `${value.length}/${maxLength}` : null;

    return (
      <View style={[ containerStyle]}>
        {label && (
          <View style={[AppStyles.marginBottom8]}>
            <AppText color={labelColor} variant="body" fontType="medium">
              {label}
              {required && <AppText color="error"> *</AppText>}
            </AppText>
          </View>
        )}

        <View style={[getContainerStyle(), inputContainerStyle]}>
          {leftIcon && (
            <View
              style={[
                AppStyles.marginLeft12,
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
              AppStyles.defaultInputStyle,
              AppStyles.padding0,
              AppStyles.f_1,
              inputSizeStyles[size],
              leftIcon ? AppStyles.marginLeft8 : undefined,
              showClearButton || showPasswordButton || rightIcon
                ? AppStyles.marginRight8
                : undefined,
              style,
            ]}
            {...rest}
          />

          <View
            style={[
              AppStyles.marginRight12,
              AppStyles.a_center,
              AppStyles.j_center,
            ]}
          >
            {showClearButton && (
              <TouchableOpacity
                onPress={handleClear}
                style={[
                  AppStyles.a_center,
                  AppStyles.j_center,
                ]}
                hitSlop={10}
              >
                <AppText>✕</AppText>
              </TouchableOpacity>
            )}

            {showPasswordButton && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={[
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
              AppStyles.marginTop8,
              AppStyles.paddingHorizontal8,
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


const sizeStyles: Record<InputSize, ViewStyle> = {
  sm: {
    ...AppStyles.paddingHorizontal12,
    ...AppStyles.paddingVertical10,
    ...AppStyles.inputHeight36,
  },
  md: {
    ...AppStyles.paddingHorizontal16,
    ...AppStyles.paddingVertical12,
    ...AppStyles.inputHeight44,
  },
  lg: {
    ...AppStyles.paddingHorizontal20,
    ...AppStyles.paddingVertical16,
    ...AppStyles.inputHeight52,
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
