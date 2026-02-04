import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppStyles from '@/style';
import { AppInput } from '../ui';

interface PickerItemProps {
  onPress: () => void;
  label: string;
  placeholder: string;
  value: string;
  showLabel?: boolean;
  iconRight?: React.ReactNode;
}

export const PickerItem = (props: PickerItemProps) => {
  const { onPress, label, placeholder, value, iconRight } = props;
  return (
    <TouchableOpacity style={AppStyles.f_1} onPress={onPress}>
      <AppInput
        rightIcon={iconRight}
        required
        label={label}
        placeholder={placeholder}
        editable={false}
        value={value}
      />
    </TouchableOpacity>
  );
};
