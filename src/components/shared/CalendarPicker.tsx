import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Colors } from '@/constants/colors';
import { Spacing, Width } from '@/constants/dimens';
import { AppButton } from '../ui';
import AppStyles from '@/style';

function toYYYYMMDD(value: string | undefined): string {
  const d = value ? new Date(value) : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

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
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.inner}>
              <View style={styles.containerCalendar}>
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
                  onPressArrowLeft={subtractMonth => subtractMonth()}
                  onPressArrowRight={addMonth => addMonth()}
                  theme={{
                    todayTextColor: Colors.primary,
                  }}
                />
                <View style={[AppStyles.f_Row, AppStyles.j_end]}>
                  <AppButton
                    style={{ backgroundColor: 'transparent' }}
                    textStyle={{ color: Colors.black }}
                    label="Hủy"
                    onPress={onClose}
                  />
                  <AppButton
                    textStyle={{ color: Colors.primary }}
                    style={{ backgroundColor: 'transparent' }}
                    label="Chọn"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: Width.fullScreenDimensionWidth * 0.85,
    maxWidth: 340,
    borderRadius: 6,
    height: 'auto',
    overflow: 'hidden',
    marginHorizontal: 30,
    backgroundColor: Colors.white,
  },
  containerCalendar: {
    width: '100%',
  },
  buttonGroup: {
    gap: Spacing.sm,
  },
});
