import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ROUTERS from '@/routers';
import { MainTabParamList } from './types';
import { HomeScreen } from '@/screens';
import { ContactScreen } from '@/screens';
import { CheckInScreen } from '@/screens';
import { ProfileScreen } from '@/screens';
import { NotificationScreen } from '@/screens';

import { useTranslation } from '@/hooks/useTranslation';
import { SvgGPS, SvgHome, SvgNotification, SvgPhoneBook } from '@assets/svgs';

import { Colors } from '@/constants/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIconColor = (focused: boolean) =>
  focused ? Colors.primary : Colors.placeholder;

function TabIconHome({ focused }: { focused: boolean }) {
  return (
    <SvgHome
      color={tabIconColor(focused)}
      fill={tabIconColor(focused)}
      stroke={tabIconColor(focused)}
    />
  );
}

function TabIconContact({ focused }: { focused: boolean }) {
  return (
    <SvgPhoneBook
      color={tabIconColor(focused)}
      fill={tabIconColor(focused)}
      stroke={tabIconColor(focused)}
    />
  );
}

function TabIconCheckIn() {
  return <SvgGPS />;
}

function TabIconNotification({ focused }: { focused: boolean }) {
  return (
    <SvgNotification
      color={tabIconColor(focused)}
      fill={tabIconColor(focused)}
      stroke={tabIconColor(focused)}
    />
  );
}

function TabIconProfile({ focused }: { focused: boolean }) {
  return (
    <SvgNotification
      color={tabIconColor(focused)}
      fill={tabIconColor(focused)}
      stroke={tabIconColor(focused)}
    />
  );
}

export const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height: '100%',
        },
      }}
    >
      <Tab.Screen
        name={ROUTERS.Home}
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: t('home'),
          tabBarIcon: TabIconHome,
        }}
      />
      <Tab.Screen
        name={ROUTERS.Contact}
        component={ContactScreen}
        options={{
          tabBarAccessibilityLabel: t('contact'),
          tabBarIcon: TabIconContact,
        }}
      />
      <Tab.Screen
        name={ROUTERS.CheckIn}
        component={CheckInScreen}
        options={{
          tabBarAccessibilityLabel: t('checkIn'),
          tabBarIcon: TabIconCheckIn,
        }}
      />
      <Tab.Screen
        name={ROUTERS.Notification}
        component={NotificationScreen}
        options={{
          tabBarAccessibilityLabel: t('notification'),
          tabBarIcon: TabIconNotification,
        }}
      />
      <Tab.Screen
        name={ROUTERS.Profile}
        component={ProfileScreen}
        options={{
          tabBarAccessibilityLabel: t('profile'),
          tabBarIcon: TabIconProfile,
        }}
      />
    </Tab.Navigator>
  );
};
