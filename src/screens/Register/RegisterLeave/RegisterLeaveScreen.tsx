import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '@/components/ui/Text';
import { AppDropdown } from '@/components/shared';
import { SummaryRow } from '@/components/shared';
import { Colors } from '@/constants/colors';
import {
  SvgCalendar,
  SvgRadioButtonChecked,
  SvgRadioNotChecked,
} from '@assets/svgs';
import AppStyles from '@/style';
import { useTranslation } from '@/hooks/useTranslation';
import { PickerItem } from '@/components/shared/PickerItem';
import { useRegisterLeave, RegisterLeaveFormValues } from './useRegisterLeave';
import { FormikProps } from 'formik';
import { getDatesInRange, toDisplayDate } from '@/utils/formatDate';
import { RegisterTemplate } from '../RegisterTemplate/RegisterTemplate';

export const RegisterLeaveScreen = () => {
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
  } = useRegisterLeave();

  const renderContent = useCallback(
    (formik: FormikProps<RegisterLeaveFormValues>) => {
      const { values } = formik;

      if (values.leaveType === 'applySameType') {
        return (
          <>
            <AppDropdown
              value={'morning'}
              options={workTypeOptions}
              onChange={() => {}}
            />
            <AppDropdown
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
    (formik: FormikProps<RegisterLeaveFormValues>) => (
      <>
        <View style={[AppStyles.gap4]}>
          <TouchableOpacity
            style={[AppStyles.gap8, AppStyles.f_Row, AppStyles.a_center]}
            onPress={() => formik.setFieldValue('leaveType', 'applySameType')}
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
          >
            {formik.values.leaveType === 'declareByHour' ? (
              <SvgRadioButtonChecked color={Colors.primary} />
            ) : (
              <SvgRadioNotChecked />
            )}
            <AppText fontType="medium">{t('declareByHour')}</AppText>
          </TouchableOpacity>
        </View>
        {renderContent(formik)}
      </>
    ),
    [renderContent, t],
  );

  const footerSlot = useCallback(
    (formik: FormikProps<RegisterLeaveFormValues>) => (
      <View style={[AppStyles.gap8]}>
        <SummaryRow label={t('availableLeave')} value="5" />
        <SummaryRow label={t('usedLeave')} value="1" />
        <SummaryRow label={t('remainingLeave')} value="3" />
      </View>
    ),
    [t],
  );

  return (
    <RegisterTemplate<RegisterLeaveFormValues>
      title={t('registerLeave')}
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
