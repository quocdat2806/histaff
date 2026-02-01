import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaContainer } from './SafeAreaContainer';
import { AppHeader } from './Header';
import { Spacing } from '@/constants/dimens';

interface DefaultLayoutProps {
  children: React.ReactNode;
  title: string;
}
export const DefaultLayout = ({ children, title }: DefaultLayoutProps) => {
  return (
    <SafeAreaContainer>
      <AppHeader title={title} />
      <View style={styles.container}>{children}</View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    flex:1
  },
});
