import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { AppText } from './Text';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
import { SvgShowPass, SvgHidePass } from '@assets/svgs';

const INPUT_HEIGHT_MD = scale(44);
const INPUT_LINE_HEIGHT = scale(20);
const INPUT_PADDING_VERTICAL_MD = scale(24);
export interface AppInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;

  error?: string;

  required?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;

  showPasswordToggle?: boolean;

  clearable?: boolean;
  onClear?: () => void;
  maxLength?: number;
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
      required = false,

      leftIcon,
      rightIcon,
      onRightIconPress,

      showPasswordToggle = false,
      secureTextEntry = false,

      clearable = false,
      onClear,
      maxLength,
      disabled = false,
      loading = false,
      labelColor = Colors.black,

      containerStyle,
      inputContainerStyle,
      style,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isDisabled = disabled || loading;

    const handleClear = () => {
      onChangeText?.('');
      onClear?.();
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    const multiline = rest.multiline ?? false;
    const numberOfLines = rest.numberOfLines;
    const isMultilineWithLines =
      multiline && typeof numberOfLines === 'number' && numberOfLines > 0;

    const getContainerStyle = (): ViewStyle => {
      const base: ViewStyle = {
        ...AppStyles.border1,
        ...AppStyles.borderDefault,
        ...AppStyles.borderRadius12,
        ...AppStyles.backGroundWhite,
        ...AppStyles.paddingHorizontal12,
        ...AppStyles.paddingVertical12,
        ...AppStyles.f_Row,
        ...AppStyles.a_center,
      };

      if (isDisabled) {
        base.backgroundColor = Colors.disabled;
        base.opacity = 0.6;
      }

      if (isMultilineWithLines) {
        base.alignItems = 'flex-start';
        base.minHeight =
          INPUT_LINE_HEIGHT * numberOfLines! + INPUT_PADDING_VERTICAL_MD;
      } else {
        base.height = INPUT_HEIGHT_MD;
      }

      return base;
    };

    const showClearButton = clearable && value.length > 0 && !isDisabled;

    const showPasswordButton = showPasswordToggle && secureTextEntry;

    return (
      <View style={[containerStyle]}>
        {label && (
          <View style={AppStyles.marginBottom4}>
            <AppText color={labelColor} fontType="medium">
              {label}
              {required && <AppText color={Colors.error}> *</AppText>}
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
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={[
              AppStyles.defaultInputStyle,
              AppStyles.padding0,
              AppStyles.f_1,
              leftIcon ? AppStyles.marginLeft8 : undefined,
              showClearButton || showPasswordButton || rightIcon
                ? AppStyles.marginRight8
                : undefined,
              style,
            ]}
            {...rest}
          />

          <View style={[AppStyles.a_center, AppStyles.j_center]}>
            {showClearButton && (
              <TouchableOpacity
                onPress={handleClear}
                style={[AppStyles.a_center, AppStyles.j_center]}
                hitSlop={10}
              >
                <AppText>✕</AppText>
              </TouchableOpacity>
            )}

            {showPasswordButton && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={[AppStyles.a_center, AppStyles.j_center]}
                hitSlop={10}
              >
                {isPasswordVisible ? <SvgShowPass /> : <SvgHidePass />}
              </TouchableOpacity>
            )}

            {rightIcon && (
              <TouchableOpacity
                onPress={onRightIconPress}
                style={[AppStyles.a_center, AppStyles.j_center]}
                disabled={!onRightIconPress}
                hitSlop={10}
              >
                {rightIcon}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {error && (
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
            </View>
          </View>
        )}
      </View>
    );
  },
);
