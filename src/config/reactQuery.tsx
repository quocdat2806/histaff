import React, { PropsWithChildren, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';

const FIVE_MINUTES = 5 * 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: FIVE_MINUTES,
      gcTime: TEN_MINUTES,
    },
    mutations: {
      retry: 1,
    },
  },
});

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const useAppStateListener = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
};

const useOnlineManager = () => {
  useEffect(() => {
    return onlineManager.setEventListener(setOnline => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setOnline(Boolean(state.isConnected));
      });

      return unsubscribe;
    });
  }, []);
};

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  useAppStateListener();
  useOnlineManager();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
