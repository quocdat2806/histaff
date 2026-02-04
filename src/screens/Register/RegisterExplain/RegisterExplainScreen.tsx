import React, { useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { RegisterTemplate } from '../RegisterTemplate/RegisterTemplate';
import {
  useRegisterExplain,
  type RegisterExplainFormValues,
} from './useRegisterExplain';
import type { FormikProps } from 'formik';
import AppStyles from '@/style';
import { PickerItem } from '@/components/shared';
import { View } from 'react-native';
import { SvgCalendar } from '@assets/svgs';
export const RegisterExplainScreen = () => {
  const { t } = useTranslation();
  const {
    schema,
    initialValues,
    handleSubmit,
    handleOpenCalendar,
    handleOpenCalendarEndDate,
    handleOpenTimeFrom,
    handleOpenTimeTo,
  } = useRegisterExplain();

  const middleSlot = useCallback(
    (formik: FormikProps<RegisterExplainFormValues>) => (
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
      </>
    ),
    [t],
  );

  return (
    <RegisterTemplate<RegisterExplainFormValues>
      title={t('registerExplanation')}
      schema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onOpenCalendarFrom={handleOpenCalendar}
      onOpenCalendarTo={handleOpenCalendarEndDate}
      middleSlot={middleSlot}
    />
  );
};
