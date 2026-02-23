import { View,Text } from "react-native";
import { DefaultLayout } from "@/components/shared";
import { useTranslation } from "@/hooks/useTranslation";
import {Calendar, LocaleConfig} from 'react-native-calendars';

import AppStyles from "@/style";
import { useState } from "react";
export const SalarySheetScreen = () => {
  const [selected, setSelected] = useState('');

  const { t } = useTranslation();
  return (
    <DefaultLayout title={t('workSheet')}>
      <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350
      }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedTextColor: 'orange'}
      }}
    />
    </DefaultLayout>
  );
};
