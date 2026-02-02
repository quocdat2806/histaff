import React from 'react';
import { View } from 'react-native';
import { AppText } from '../ui';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
interface SummaryRowProps {
  label: string;
  value: string;
}

export const SummaryRow = ({ label, value }: SummaryRowProps) => {
  return (
    <View style={[AppStyles.f_Row, AppStyles.j_spaceBetween]}>
      <AppText >{label}</AppText>
      <AppText  color={Colors.primary}>
        {value}
      </AppText>
    </View>
  );
};


