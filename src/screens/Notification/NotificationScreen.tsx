import React from 'react';

import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { AppText } from '@/components/ui/';
import { SafeAreaContainer } from '@/components/shared/';
import { useTranslation } from '@/hooks/useTranslation';
type Props = BottomTabScreenProps<MainTabParamList, 'Notification'>;

export const NotificationScreen = (_props: Props) => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppText>{t('notificationScreenMessage')}</AppText>
    </SafeAreaContainer>
  );
};
