import React from 'react';


import { AppText } from '@/components/ui/';
import { SafeAreaContainer } from '@/components/shared/';
import { useTranslation } from '@/hooks/useTranslation';

export const NotificationScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppText>{t('notificationScreenMessage')}</AppText>
    </SafeAreaContainer>
  );
};
