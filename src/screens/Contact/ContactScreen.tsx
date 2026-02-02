import React from 'react';
import { Text } from 'react-native';

import { SafeAreaContainer } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';

export const ContactScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <Text>Update ảnh</Text>
    </SafeAreaContainer>
  );
};
