import React from 'react';
import { View } from 'react-native';

import AppStyles from '@/style';
import { AppText } from '@/components/ui';
import { Colors } from '@/constants/colors';

export const AppEmptyList: React.FC = ({}) => {
  return (
    <View style={[AppStyles.f_1, AppStyles.j_center]}>
      <AppText color={Colors.secondaryGray} variant="h6" center>
        Không có dữ liệu để hiển thị{' '}
      </AppText>
    </View>
  );
};
