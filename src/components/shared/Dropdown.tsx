import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
import { AppText } from '../ui';
import { SvgChevronDown } from '@assets/svgs';
import { scale } from 'react-native-size-matters';
import { useDropdown } from '@/context/DropdownContext';
import type { DropdownOption } from '@/context/DropdownContext';

export interface AppDropdownProps<T = string> {
  value?: T;
  options: DropdownOption<T>[];
  placeholder?: string;
  onChange: (value: T) => void;
}

export function AppDropdown<T>({
  value,
  options,
  placeholder = 'Chọn',
  onChange,
}: AppDropdownProps<T>) {
  const { openDropdown } = useDropdown();

  const selectedLabel = useMemo(() => {
    return options.find(o => o.value === value)?.label;
  }, [value, options]);

  const handlePress = () => {
    openDropdown({ options, value, placeholder, onChange });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.dropdownContainer,
        AppStyles.backGroundWhite,
        AppStyles.borderRadius16,
        AppStyles.paddingHorizontal16,
        AppStyles.j_center,
        AppStyles.border1,
        AppStyles.borderDefault,
      ]}
      onPress={handlePress}
    >
      <View
        style={[
          AppStyles.f_Row,
          AppStyles.j_spaceBetween,
          AppStyles.a_center,
          AppStyles.gap10,
        ]}
      >
        <AppText color={selectedLabel ? Colors.black : Colors.placeholder}>
          {selectedLabel ?? placeholder}
        </AppText>
        <SvgChevronDown />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    height: scale(44),
  },
});
