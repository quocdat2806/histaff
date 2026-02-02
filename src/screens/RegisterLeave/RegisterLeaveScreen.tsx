import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { SummaryRow } from '@/components/shared';
import { Colors } from '@/constants/colors';
import { DefaultLayout } from '@/components/shared';
import { SvgRadioButton } from '@assets/svgs';
import AppStyles from '@/style';
import { useCalendarPicker } from '@/context/CalendarPickerContext';
import { useTranslation } from '@/hooks/useTranslation';
export const RegisterLeaveScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const { openCalendarPicker } = useCalendarPicker();
  const { t } = useTranslation();
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
    <DefaultLayout title={t('registerLeave')}>
      <ScrollView style={AppStyles.f_1} showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.f_1, AppStyles.gap16]}>
          <View style={[AppStyles.f_Row, AppStyles.gap12]}>
           <TouchableOpacity style={AppStyles.f_1} onPress={handleOpenCalendar}>
              <AppInput
                label={`${t('fromDate')} *`}
                placeholder={t('selectDate')}
                editable={false}
                value={selectedStartDate}
              />
           </TouchableOpacity>
            <TouchableOpacity style={AppStyles.f_1} onPress={handleOpenCalendarEndDate}>
              <AppInput
                label={`${t('toDate')} *`}
                placeholder={t('selectDate')}
                editable={false}
                value={selectedEndDate}
              />
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.gap8]}>
            <View
              style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText  fontType="medium">
                {t('applySameType')}
              </AppText>
            </View>
            <View
              style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText fontType="medium">
                {t('declareByDay')}
              </AppText>
            </View>
            <View
              style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
            >
              <SvgRadioButton color={Colors.primary} />
              <AppText  fontType="medium">
                {t('declareByHour')}
              </AppText>
            </View>
          </View>

          <View style={[AppStyles.gap8]}>
            <AppText  fontType="medium">
              {t('reason')}
              <AppText  color={Colors.error}>
                *
              </AppText>
            </AppText>
            <AppInput
              placeholder={t('reasonPlaceholder')}
              multiline
              numberOfLines={4}
            />
          </View>

          <AppButton label={t('sendApprove')} />

          <View style={[AppStyles.gap8, AppStyles.marginTop12]}>
            <SummaryRow label={t('availableLeave')} value="5" />
            <SummaryRow label={t('usedLeave')} value="1" />
            <SummaryRow label={t('remainingLeave')} value="3" />
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

