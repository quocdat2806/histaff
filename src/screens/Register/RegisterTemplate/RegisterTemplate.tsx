import React from 'react';
import { View, ScrollView } from 'react-native';
import { FormikProps } from 'formik';
import type { AnyObjectSchema } from 'yup';
import { DefaultLayout } from '@/components/shared';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { FormWrapper, getSubmitButtonProps } from '@/components/shared';
import { PickerItem } from '@/components/shared/PickerItem';
import { useTranslation } from '@/hooks/useTranslation';
import AppStyles from '@/style';
import { SvgCalendar } from '@assets/svgs';

export type RegisterFormBase = {
  fromDate: string;
  toDate: string;
  reason: string;
};

export interface RegisterTemplateProps<T extends RegisterFormBase> {
  title: string;
  schema: AnyObjectSchema;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  onOpenCalendarFrom: (formik: FormikProps<T>) => void;
  onOpenCalendarTo: (formik: FormikProps<T>) => void;
  middleSlot: (formik: FormikProps<T>) => React.ReactNode;
  footerSlot?: React.ReactNode;
}

export function RegisterTemplate<T extends RegisterFormBase>({
  title,
  schema,
  initialValues,
  onSubmit,
  onOpenCalendarFrom,
  onOpenCalendarTo,
  middleSlot,
  footerSlot,
}: RegisterTemplateProps<T>) {
  const { t } = useTranslation();

  return (
    <DefaultLayout title={title}>
      <ScrollView style={AppStyles.f_1} showsVerticalScrollIndicator={false}>
        <FormWrapper
          schema={schema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <View style={[AppStyles.f_1, AppStyles.gap16]}>
              <View style={[AppStyles.f_Row, AppStyles.gap12]}>
                <PickerItem
                  onPress={() => onOpenCalendarFrom(formik)}
                  label={t('fromDate')}
                  placeholder={t('selectDate')}
                  value={formik.values.fromDate}
                  iconRight={<SvgCalendar />}
                />
                <PickerItem
                  onPress={() => onOpenCalendarTo(formik)}
                  label={t('toDate')}
                  placeholder={t('selectDate')}
                  value={formik.values.toDate}
                  iconRight={<SvgCalendar />}
                />
              </View>

              {middleSlot(formik)}

              <AppInput
                required
                label={t('reason')}
                placeholder={t('reasonPlaceholder')}
                multiline
                numberOfLines={4}
                value={formik.values.reason}
                onChangeText={(text) => formik.setFieldValue('reason', text)}
              />
              <AppButton
                label={t('sendApprove')}
                {...getSubmitButtonProps(formik)}
              />

              {footerSlot}
            </View>
          )}
        </FormWrapper>
      </ScrollView>
    </DefaultLayout>
  );
}
