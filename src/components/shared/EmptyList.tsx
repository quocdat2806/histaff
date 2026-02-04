import React from 'react';
import { View } from 'react-native';

import AppStyles from '@/style';
import { AppText } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

export const AppEmptyList = () => {
  const { t } = useTranslation();
  return (
    <View style={[AppStyles.f_1, AppStyles.j_center]}>
      <AppText color={Colors.secondaryGray} variant="h6" center>
        {t('noData')}
      </AppText>
    </View>
  );
};
