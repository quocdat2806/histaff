import React from 'react';
import { AppHeader } from '@/components/shared/';
import { SafeAreaContainer } from '@/components/shared/';
import { useTranslation } from '@/hooks/useTranslation';


export const CheckInScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppHeader title={t('checkIn')} />
    </SafeAreaContainer>
  );
};
