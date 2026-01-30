import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ROUTERS from '@/routers';
import { AuthStackParamList } from './types';
import { LoginScreen } from '@/screens/Login';
import { CompanyCodeScreen } from '@/screens/CompanyCode';
const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTERS.CompanyCode}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTERS.Login} component={LoginScreen} />
      <Stack.Screen name={ROUTERS.CompanyCode} component={CompanyCodeScreen} />

    </Stack.Navigator>
  );
};
