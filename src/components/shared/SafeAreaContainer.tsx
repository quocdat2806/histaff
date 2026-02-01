import React, { useMemo } from 'react';

import { View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppStyles from '@/style';
import { Colors } from '@/constants/colors';

type SafeAreaContainerProps = {
  children: React.ReactNode;
};

export const SafeAreaContainer = ({ children }: SafeAreaContainerProps) => {
  const insets = useSafeAreaInsets();
  const statusBarStyle = useMemo(() => {
    return {
      height: insets.top,
      backgroundColor: Colors.primary,
    };
  }, [insets.top]);

  return (
    <View style={[AppStyles.f_1]}>
      <View style={statusBarStyle} />
      <SafeAreaView style={[AppStyles.f_1]} edges={['left', 'right', 'bottom']}>
        {children}
      </SafeAreaView>
    </View>
  );
};
