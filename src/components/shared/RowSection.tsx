import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/Text';
import AppStyles from '@/style';
import { Colors } from '@/constants/colors';
import { AppList } from './List';

export interface RowSectionItem {
  name: string;
  value?: string | number | null;
}

export interface RowSectionProps {
  data: RowSectionItem[];
}
export const RowSection: React.FC<RowSectionProps> = ({ data }) => {
  return (
    <AppList
      scrollEnabled={false}
      data={data}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => (
        <View
          style={[
            AppStyles.f_Row,
            AppStyles.gap4,
            AppStyles.j_spaceBetween,
            AppStyles.gap10,
          ]}
        >
          <AppText style={[AppStyles.f_1, styles.label]}>{item.name}</AppText>
          <AppText
            color={Colors.primary}
            style={[AppStyles.f_1, styles.value, styles.textRight]}
          >
            {item.value}
          </AppText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
