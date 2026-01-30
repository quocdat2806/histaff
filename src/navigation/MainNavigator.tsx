import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ROUTERS from '@/routers';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTERS.MainTabs} component={TabNavigator} />
    </Stack.Navigator>
  );
};
