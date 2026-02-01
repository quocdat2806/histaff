import React from 'react';

import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator, navigationRef } from '@/navigation';
import { AlertProvider } from '@/context/AlertContext';
import { CalendarPickerProvider } from '@/context/CalendarPickerContext';
import { ReactQueryProvider } from '@/config/reactQuery';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ReactQueryProvider>
        <AlertProvider>
          <CalendarPickerProvider>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </CalendarPickerProvider>
        </AlertProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
