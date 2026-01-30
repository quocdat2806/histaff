import React from 'react';

import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/navigation';
import { AlertProvider } from '@/context/AlertContext';
import { ReactQueryProvider } from '@/config/reactQuery';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ReactQueryProvider>
        <AlertProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AlertProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}

export default App;
