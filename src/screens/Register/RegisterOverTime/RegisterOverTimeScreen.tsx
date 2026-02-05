import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { RowSection } from '@/components/shared';
import { Colors } from '@/constants/colors';
import {
  SvgCalendar,
  SvgRadioButtonChecked,
  SvgRadioNotChecked,
} from '@assets/svgs';
import AppStyles from '@/style';
import { useTranslation } from '@/hooks/useTranslation';
import { PickerItem } from '@/components/shared/PickerItem';
import {
  useRegisterOvertime,
  RegisterOvertimeFormValues,
} from './useRegisterOverTime';
import { FormikProps } from 'formik';
import { RegisterTemplate } from '../RegisterTemplate/RegisterTemplate';

export const RegisterOvertimeScreen = () => {
  const { t } = useTranslation();
  const {
    schema,
    initialValues,
    handleSubmit,
    handleOpenCalendar,
    handleOpenCalendarEndDate,
    handleOpenTimeFrom,
    handleOpenTimeTo,
  } = useRegisterOvertime();

  const middleSlot = useCallback(
    (formik: FormikProps<RegisterOvertimeFormValues>) => (
      <>
        <View style={[AppStyles.f_Row, AppStyles.gap12]}>
          <PickerItem
            onPress={() => handleOpenTimeFrom(formik)}
            label={t('hourFrom')}
            placeholder={t('hourFromPlaceholder')}
            value={formik.values.timeFrom}
            iconRight={<SvgCalendar />}
          />
          <PickerItem
            onPress={() => handleOpenTimeTo(formik)}
            label={t('hourTo')}
            placeholder={t('hourToPlaceholder')}
            value={formik.values.timeTo}
            iconRight={<SvgCalendar />}
          />
        </View>
        <TouchableOpacity
          style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
          onPress={() => formik.setFieldValue('leaveType', 'applySameType')}
          activeOpacity={0.7}
        >
          {formik.values.leaveType === 'applySameType' ? (
            <SvgRadioButtonChecked color={Colors.primary} />
          ) : (
            <SvgRadioNotChecked />
          )}
          <AppText fontType="medium">{t('applySameType')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
          onPress={() => formik.setFieldValue('leaveType', 'declareByDay')}
          activeOpacity={0.7}
        >
          {formik.values.leaveType === 'declareByDay' ? (
            <SvgRadioButtonChecked color={Colors.primary} />
          ) : (
            <SvgRadioNotChecked />
          )}
          <AppText fontType="medium">{t('declareByDay')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
          onPress={() => formik.setFieldValue('leaveType', 'declareByHour')}
          activeOpacity={0.7}
        >
          {formik.values.leaveType === 'declareByHour' ? (
            <SvgRadioButtonChecked color={Colors.primary} />
          ) : (
            <SvgRadioNotChecked />
          )}
          <AppText fontType="medium">{t('declareByHour')}</AppText>
        </TouchableOpacity>
      </>
    ),
    [t, handleOpenTimeFrom, handleOpenTimeTo],
  );

  return (
    <RegisterTemplate<RegisterOvertimeFormValues>
      title={t('registerOvertime')}
      schema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onOpenCalendarFrom={handleOpenCalendar}
      onOpenCalendarTo={handleOpenCalendarEndDate}
      middleSlot={middleSlot}
      footerSlot={
        <RowSection
          data={[
            { name: t('totalHourOverTimeOnMonth'), value: '5' },
            { name: t('totalHourOverTimeOnYear'), value: '1' },
          ]}
        />
      }
    />
  );
};
