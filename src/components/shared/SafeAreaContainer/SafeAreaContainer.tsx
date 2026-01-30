import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import AppStyles from '@/style';
export const SafeAreaContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SafeAreaView style={AppStyles.f_1}>{children}</SafeAreaView>;
};
