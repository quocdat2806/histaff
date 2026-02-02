import React from 'react';
import { View } from 'react-native';
import { SafeAreaContainer } from './SafeAreaContainer';
import { AppHeader } from './Header';
import AppStyles from '@/style';

interface DefaultLayoutProps {
  children: React.ReactNode;
  title: string;
}
export const DefaultLayout = ({ children, title }: DefaultLayoutProps) => {
  return (
    <SafeAreaContainer>
      <AppHeader title={title} />
      <View style={[AppStyles.padding12,AppStyles.f_1]}>{children}</View>
    </SafeAreaContainer>
  );
};


