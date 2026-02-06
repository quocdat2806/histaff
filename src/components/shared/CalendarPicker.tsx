import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Colors } from '@/constants/colors';
import { AppButton } from '../ui';
import AppStyles from '@/style';
import { toYYYYMMDD } from '@/utils/formatDate';
import { Texts } from '@/constants/texts';

export interface CalendarPickerModalProps {
  isVisible: boolean;
  defaultDate?: string;
  onDateChange: (date: string) => void;
  onClose: () => void;
}

export function CalendarPickerModal({
  isVisible,
  defaultDate,
  onDateChange,
  onClose,
}: CalendarPickerModalProps) {
  const initialDate = useMemo(() => toYYYYMMDD(defaultDate), [defaultDate]);
  const [currentDate, setCurrentDate] = useState(initialDate);

  useEffect(() => {
    if (isVisible) {
      setCurrentDate(initialDate);
    }
  }, [isVisible, initialDate]);

  const handleBackdropPress = () => {
    onClose();
  };

  const handleDayPress = (day: DateData) => {
    setCurrentDate(day.dateString);
    onDateChange(day.dateString);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View
          style={[
            AppStyles.backGroundModal,
            AppStyles.f_1,
            AppStyles.a_center,
            AppStyles.j_center,
          ]}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                AppStyles.modalContainer,
                AppStyles.borderRadius8,
                AppStyles.marginHorizontal28,
              ]}
            >
              <View style={[AppStyles.width100Percent]}>
                <Calendar
                  current={currentDate}
                  enableSwipeMonths
                  markedDates={{
                    [currentDate]: {
                      selected: true,
                      selectedColor: Colors.primary,
                    },
                  }}
                  onDayPress={handleDayPress}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  theme={{
                    todayTextColor: Colors.primary,
                  }}
                />
                <View style={[AppStyles.f_Row, AppStyles.j_end]}>
                  <AppButton
                    style={AppStyles.backGroundTransparent}
                    textStyle={{ color: Colors.black }}
                    label={Texts.cancel}
                    onPress={onClose}
                  />
                  <AppButton
                    textStyle={{ color: Colors.primary }}
                    style={AppStyles.backGroundTransparent}
                    label={Texts.select}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
