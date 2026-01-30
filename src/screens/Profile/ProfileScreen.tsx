import React from 'react';

import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { SafeAreaContainer } from '@/components/shared/';
import { AppText } from '@/components/ui/';
import { useTranslation } from '@/hooks/useTranslation';
type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

export const ProfileScreen = (_props: Props) => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppText>{t('profileScreenMessage')}</AppText>
    </SafeAreaContainer>
  );
};
