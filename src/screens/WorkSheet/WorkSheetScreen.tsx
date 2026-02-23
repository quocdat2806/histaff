import { View,Text } from "react-native";
import { DefaultLayout } from "@/components/shared";
import { useTranslation } from "@/hooks/useTranslation";
import {Calendar, LocaleConfig} from 'react-native-calendars';

import AppStyles from "@/style";
import { useState } from "react";
export const WorkSheetScreen = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  console.log('selected', selected);
  return (
    <DefaultLayout title={t('workSheet')}>
           <Calendar
      style={{
        backgroundColor:'transparent'
      }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]:{selected: true, disableTouchEvent: true,customStyles:{
          container:{
            backgroundColor:'red'
          }
        }}
      }}
    
      theme={{
        backgroundColor: 'transparent',
        calendarBackground: 'transparent',
        
      }}
    />
    </DefaultLayout>
  );
};
