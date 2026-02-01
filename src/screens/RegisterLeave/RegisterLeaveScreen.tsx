import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { SummaryRow } from '@/components/shared';
import { Spacing } from '@/constants/dimens';
import { Colors } from '@/constants/colors';
import { DefaultLayout } from '@/components/shared';
import { SvgRadioButton } from '@assets/svgs';
import AppStyles from '@/style';
import { useCalendarPicker } from '@/context/CalendarPickerContext';
export const RegisterLeaveScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const { openCalendarPicker, closeCalendarPicker } = useCalendarPicker();

  const handleOpenCalendar = () => {
    openCalendarPicker({
      defaultDate: selectedStartDate || undefined,
      onDateChange: date => {
        setSelectedStartDate(date);
      },
    });
  };
  const handleOpenCalendarEndDate = () => {
    openCalendarPicker({
      defaultDate: selectedEndDate || undefined,
      onDateChange: date => {
        setSelectedEndDate(date);
      },
    });
  };
  return (
    <DefaultLayout title="Đăng ký nghỉ">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.row}>
           <TouchableOpacity style={{ flex: 1 }} onPress={handleOpenCalendar}>
              <AppInput
                label="Từ ngày *"
                placeholder="Chọn ngày"
                editable={false}
                value={selectedStartDate}
              />
           </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={handleOpenCalendarEndDate}>
              <AppInput
                label="Đến ngày *"
                placeholder="Chọn ngày"
                editable={false}
                value={selectedEndDate}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.radioGroup}>
            <View
              style={[styles.radioItem, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText variant="body" fontType="medium">
                Áp dụng cùng loại công
              </AppText>
            </View>
            <View
              style={[styles.radioItem, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText variant="body" fontType="medium">
                Khai báo theo ngày
              </AppText>
            </View>
            <View
              style={[styles.radioItem, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText variant="body" fontType="medium">
                Vắng mặt việc riêng theo giờ
              </AppText>
            </View>
          </View>

          <View style={styles.section}>
            <AppText variant="body" fontType="medium">
              Lý do
              <AppText variant="body" color={Colors.error}>
                *
              </AppText>
            </AppText>
            <AppInput
              placeholder="Vui lòng nhập lý do"
              multiline
              numberOfLines={4}
            />
          </View>

          <AppButton label="Gửi duyệt" />

          <View style={styles.summary}>
            <SummaryRow label="Ngày phép khả dụng" value="5" />
            <SummaryRow label="Ngày phép đã nghỉ" value="1" />
            <SummaryRow label="Ngày phép còn lại" value="3" />
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.lg,
  },

  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  flex: {
    flex: 1,
    gap: Spacing.xs,
  },

  radioGroup: {
    gap: Spacing.sm,
  },
  radioItem: {
    gap: Spacing.xs,
  },

  section: {
    gap: Spacing.xs,
  },

  summary: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});
