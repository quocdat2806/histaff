import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { AppText } from '../ui';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
import { StyleSheet } from 'react-native';
interface SummaryRowProps {
  label: string;
  value: string;
  textLeftStyle?: StyleProp<TextStyle>;
  textRightStyle?: StyleProp<TextStyle>;
}

export const SummaryRow = ({
  label,
  value,
  textLeftStyle,
  textRightStyle,
}: SummaryRowProps) => {
  return (
    <View
      style={[
        AppStyles.f_Row,
        AppStyles.gap4,
        AppStyles.j_spaceBetween,
        styles.container,
      ]}
    >
      <AppText style={[AppStyles.f_1, styles.label, textLeftStyle]}>
        {label}
      </AppText>
      <AppText
        color={Colors.primary}
        style={[AppStyles.f_1, styles.value, textRightStyle, styles.textRight]}
      >
        {value}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  label: {
    flexShrink: 1,
    minWidth: 0,
  },
  value: {
    flexShrink: 1,
    minWidth: 0,
  },
  textRight: {
    textAlign: 'right',
  },
});
