import React from 'react';

import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { AppHeader } from '@/components/shared/';
import { SafeAreaContainer } from '@/components/shared/';
import { useTranslation } from '@/hooks/useTranslation';

type Props = BottomTabScreenProps<MainTabParamList, 'CheckIn'>;

export const CheckInScreen = (_props: Props) => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppHeader title={t('checkIn')} centerTitle />
    </SafeAreaContainer>
  );
};
