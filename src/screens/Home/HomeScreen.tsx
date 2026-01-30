import React from 'react';
import { View } from 'react-native';

import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAuthStore } from '@/store/authStore';
import { SafeAreaContainer } from '@/components/shared';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export const HomeScreen = (_props: Props) => {
  const user = useAuthStore(state => state.user);



  return (
    <SafeAreaContainer>
      <View >

      </View>
    </SafeAreaContainer>
  );
};
