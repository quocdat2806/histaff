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

export const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height:'100%',
        },
      }}
    >
      <Tab.Screen
        name={ROUTERS.Home}
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: t('home'),
         tabBarIcon: ({ focused }) => (
            <SvgHome
              color={focused ? Colors.primary : Colors.placeholder}
              fill={focused ? Colors.primary : Colors.placeholder}
              stroke={focused ? Colors.primary : Colors.placeholder}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTERS.Contact}
        component={ContactScreen}
        options={{
          tabBarAccessibilityLabel: t('contact'),
       tabBarIcon: ({ focused }) => (
            <SvgPhoneBook
              color={focused ? Colors.primary : Colors.placeholder}
              fill={focused ? Colors.primary : Colors.placeholder}
              stroke={focused ? Colors.primary : Colors.placeholder}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTERS.CheckIn}
        component={CheckInScreen}
        options={{
          tabBarAccessibilityLabel: t('checkIn'),
          tabBarIcon: ({ focused }) => (
            <SvgGPS
              color={focused ? Colors.primary : Colors.placeholder}
              fill={focused ? Colors.primary : Colors.placeholder}
              stroke={focused ? Colors.primary : Colors.placeholder}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTERS.Notification}
        component={NotificationScreen}
        options={{
          tabBarAccessibilityLabel: t('notification'),
               tabBarIcon: ({ focused }) => (
            <SvgNotification
              color={focused ? Colors.primary : Colors.placeholder}
              fill={focused ? Colors.primary : Colors.placeholder}
              stroke={focused ? Colors.primary : Colors.placeholder}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTERS.Profile}
        component={ProfileScreen}
        options={{
          tabBarAccessibilityLabel: t('profile'),
            tabBarIcon: ({ focused }) => (
            <SvgNotification
              color={focused ? Colors.primary : Colors.placeholder}
              fill={focused ? Colors.primary : Colors.placeholder}
              stroke={focused ? Colors.primary : Colors.placeholder}
            />)
        }}
      />
    </Tab.Navigator>
  );
};
