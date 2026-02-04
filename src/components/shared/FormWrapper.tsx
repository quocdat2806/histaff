import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import type { AnyObjectSchema } from 'yup';
import { AppText } from '../ui';
import { Colors } from '@/constants/colors';

interface FormWrapperProps<TValues extends Record<string, any>> {
  schema: AnyObjectSchema;
  initialValues: TValues;
  onSubmit: (
    values: TValues,
    helpers: FormikHelpers<TValues>,
  ) => void | Promise<void>;
  children: (formikProps: FormikProps<TValues>) => React.ReactNode;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  enableReinitialize?: boolean;
}

export const FormWrapper = <TValues extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  validateOnMount = false,
  enableReinitialize = false,
}: FormWrapperProps<TValues>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      validateOnMount={validateOnMount}
      enableReinitialize={enableReinitialize}
    >
      {formikProps => children(formikProps)}
    </Formik>
  );
};

interface FormFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  touched,
  children,
  required = false,
}) => {
  const showError = touched && error;

  return (
    <View>
      {label && (
        <AppText fontType="medium">
          {label}
          {required && <AppText color={Colors.error}> *</AppText>}
        </AppText>
      )}
      {children}
      {showError && (
        <AppText variant="caption" color={Colors.error}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export const getFieldProps = <T extends Record<string, any>>(
  formik: FormikProps<T>,
  fieldName: keyof T & string,
) => {
  return {
    value: formik.values[fieldName],
    onChangeText: formik.handleChange(fieldName),
    onBlur: formik.handleBlur(fieldName),
    error: formik.errors[fieldName] as string,
    touched: formik.touched[fieldName] as boolean,
  };
};

export const getSubmitButtonProps = <T extends Record<string, any>>(
  formik: FormikProps<T>,
) => {
  return {
    onPress: formik.handleSubmit,
    disabled: formik.isSubmitting || !formik.isValid,
    loading: formik.isSubmitting,
  };
};
