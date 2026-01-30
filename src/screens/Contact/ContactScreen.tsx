import React from 'react';
import { Text } from 'react-native';


import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { SafeAreaContainer } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';

type Props = BottomTabScreenProps<MainTabParamList, 'Contact'>;

export const ContactScreen = (_props: Props) => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <Text>Update ảnh</Text>
    </SafeAreaContainer>
  );
};
