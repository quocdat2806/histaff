import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ROUTERS from '@/routers';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { RegisterScreen, SalarySheetScreen, WorkSheetScreen } from '@/screens';
import { ApproveScreen } from '@/screens';
import { RegisterLeaveScreen } from '@/screens';
import { RegisterOvertimeScreen } from '@/screens';
import { RegisterExplainScreen } from '@/screens';
import { RegisterHistoryScreen } from '@/screens';
import { ApproveLeaveScreen } from '@/screens';
import { ApproveOverTimeScreen } from '@/screens';
import { ApproveExplainScreen } from '@/screens';
import { ApproveHistoryScreen } from '@/screens';
import { RegisterHistoryDetail } from '@/screens';
import { ApproveHistoryDetail } from '@/screens';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTERS.MainTabs} component={TabNavigator} />
      <Stack.Screen name={ROUTERS.Register} component={RegisterScreen} />
      <Stack.Screen name={ROUTERS.Approve} component={ApproveScreen} />
      <Stack.Screen
        name={ROUTERS.RegisterLeave}
        component={RegisterLeaveScreen}
      />
      <Stack.Screen
        name={ROUTERS.RegisterOvertime}
        component={RegisterOvertimeScreen}
      />
      <Stack.Screen
        name={ROUTERS.RegisterExplanation}
        component={RegisterExplainScreen}
      />
      <Stack.Screen
        name={ROUTERS.RegisterHistory}
        component={RegisterHistoryScreen}
      />
      <Stack.Screen
        name={ROUTERS.ApproveLeave}
        component={ApproveLeaveScreen}
      />
      <Stack.Screen
        name={ROUTERS.ApproveOverTime}
        component={ApproveOverTimeScreen}
      />
      <Stack.Screen
        name={ROUTERS.ApproveExplain}
        component={ApproveExplainScreen}
      />
      <Stack.Screen
        name={ROUTERS.ApproveHistory}
        component={ApproveHistoryScreen}
      />
      <Stack.Screen
        name={ROUTERS.ApproveHistoryDetail}
        component={ApproveHistoryDetail}
      />
      <Stack.Screen
        name={ROUTERS.RegisterHistoryDetail}
        component={RegisterHistoryDetail}
      />
      <Stack.Screen
        name={ROUTERS.WorkSheet}
        component={WorkSheetScreen}
      />
      <Stack.Screen
        name={ROUTERS.SalarySheet}
        component={SalarySheetScreen}
      />
    </Stack.Navigator>
  );
};
