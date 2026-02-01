import React from 'react';


import { SafeAreaContainer } from '@/components/shared/';
import { AppText } from '@/components/ui/';
import { useTranslation } from '@/hooks/useTranslation';

export const ProfileScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <AppText>{t('profileScreenMessage')}</AppText>
    </SafeAreaContainer>
  );
};
