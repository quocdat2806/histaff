import React, { useCallback } from 'react';
import { View, TouchableOpacity,StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { AppDropdown, SummaryRow } from '@/components/shared';
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
import { getDatesInRange, toDisplayDate } from '@/utils/formatDate';
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
    workTypeOptions,
  } = useRegisterOvertime();

  const renderContent = useCallback(
    (formik: FormikProps<RegisterOvertimeFormValues>) => {
      const { values } = formik;

      if (values.leaveType === 'applySameType') {
        return (
          <>
            <AppDropdown
              placeholder="Ca sáng | Chọn loại công"
              value={'morning'}
              options={workTypeOptions}
              onChange={() => {}}
            />
            <AppDropdown
              placeholder="Ca chiều | Chọn loại công"
              value={'afternoon'}
              options={workTypeOptions}
              onChange={() => {}}
            />
          </>
        );
      }
      if (values.leaveType === 'declareByDay') {
        const dateKeys = getDatesInRange(values.fromDate, values.toDate);
        return dateKeys.map(dateKey => {
          const declaration = values.dailyDeclarations?.[dateKey] ?? {
            morning: '',
            afternoon: '',
          };
          return (
            <View key={dateKey} style={[AppStyles.gap4]}>
              <AppText fontType="medium">{toDisplayDate(dateKey)}</AppText>
              <View style={[AppStyles.gap16]}>
                <AppDropdown
                  placeholder="Ca sáng | Chọn loại công"
                  value={declaration.morning}
                  options={workTypeOptions}
                  onChange={value =>
                    formik.setFieldValue(`dailyDeclarations.${dateKey}`, {
                      ...declaration,
                      morning: value,
                    })
                  }
                />
                <AppDropdown
                  placeholder="Ca chiều | Chọn loại công"
                  value={declaration.afternoon}
                  options={workTypeOptions}
                  onChange={value =>
                    formik.setFieldValue(`dailyDeclarations.${dateKey}`, {
                      ...declaration,
                      afternoon: value,
                    })
                  }
                />
              </View>
            </View>
          );
        });
      }
      if (values.leaveType === 'declareByHour') {
        return (
          <View style={[AppStyles.f_Row, AppStyles.gap12]}>
            <PickerItem
              onPress={() => handleOpenTimeFrom(formik)}
              label={t('hourFrom')}
              placeholder={t('hourFromPlaceholder')}
              value={values.timeFrom}
              iconRight={<SvgCalendar />}
            />
            <PickerItem
              onPress={() => handleOpenTimeTo(formik)}
              label={t('hourTo')}
              placeholder={t('hourToPlaceholder')}
              value={values.timeTo}
              iconRight={<SvgCalendar />}
            />
          </View>
        );
      }
      return null;
    },
    [handleOpenTimeFrom, handleOpenTimeTo, t, workTypeOptions],
  );

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
    [renderContent, t],
  );

  const footerSlot = useCallback(
    () => (
      <View style={[AppStyles.gap8]}>
        <SummaryRow
          textLeftStyle={styles.flex4}
          label={t('totalHourOverTimeOnMonth')}
          value="5"
        />
        <SummaryRow
          textLeftStyle={styles.flex4}
          label={t('totalHourOverTimeOnYear')}
          value="1"
        />
      </View>
    ),
    [t],
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
      footerSlot={footerSlot}
    />
  );
};


const styles = StyleSheet.create({
  flex4: {
    flex: 4,
  },
});