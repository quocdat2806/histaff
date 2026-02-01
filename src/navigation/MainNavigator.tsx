import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ROUTERS from '@/routers';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { RegisterScreen } from '@/screens';
import { ApproveScreen } from '@/screens';
import { RegisterLeaveScreen } from '@/screens';
const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTERS.MainTabs} component={TabNavigator} />
      <Stack.Screen name={ROUTERS.Register} component={RegisterScreen} />   
      <Stack.Screen name={ROUTERS.Approve} component={ApproveScreen} />   
      <Stack.Screen name={ROUTERS.RegisterLeave} component={RegisterLeaveScreen} />   
    </Stack.Navigator>
  );
};
