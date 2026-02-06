import React from 'react';
import { View, ScrollView } from 'react-native';
import type { AnyObjectSchema } from 'yup';
import { DefaultLayout } from '@/components/shared';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { FormWrapper, getSubmitButtonProps } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';
import AppStyles from '@/style';

export type ApproveFormBase = {
  reason: string;
};

export interface ApproveTemplateProps<T extends ApproveFormBase> {
  title: string;
  schema: AnyObjectSchema;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  middleSlot?: React.ReactNode;
}

export function ApproveTemplate<T extends ApproveFormBase>({
  title,
  schema,
  initialValues,
  onSubmit,
  middleSlot,
}: ApproveTemplateProps<T>) {
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
              {middleSlot}
              <AppInput
                required
                label={t('reason')}
                placeholder={t('reasonPlaceholder')}
                multiline
                numberOfLines={4}
                value={formik.values.reason}
                onChangeText={(text) => formik.setFieldValue('reason', text)}
              />
              <View style={[AppStyles.f_Row, AppStyles.gap12]}>
                <AppButton
                  variant="outline"
                  style={AppStyles.f_1}
                  label={t('reject')}
                  {...getSubmitButtonProps(formik)}
                />
                <AppButton
                  style={AppStyles.f_1}
                  label={t('sendApprove')}
                  {...getSubmitButtonProps(formik)}
                />
              </View>
            </View>
          )}
        </FormWrapper>
      </ScrollView>
    </DefaultLayout>
  );
}
