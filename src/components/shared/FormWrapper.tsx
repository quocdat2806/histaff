import React from 'react';
import { View, Text } from 'react-native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AppText } from '../ui';
import { Colors } from '@/constants/colors';
interface FormWrapperProps<T extends z.ZodType<any, any>> {
  schema: T;
  initialValues: z.infer<T>;
  onSubmit: (values: z.infer<T>, helpers: FormikHelpers<z.infer<T>>) => void | Promise<void>;
  children: (formikProps: FormikProps<z.infer<T>>) => React.ReactNode;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  enableReinitialize?: boolean;
}

export const FormWrapper = <T extends z.ZodType<any, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  validateOnMount = false,
  enableReinitialize = false,
}: FormWrapperProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(schema)}
      onSubmit={onSubmit}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      validateOnMount={validateOnMount}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => children(formikProps)}
    </Formik>
  );
};

interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  error,
  touched,
  children,
  required = false,
}) => {
  const showError = touched && error;

  return (
    <View >
      {label && (
        <AppText   variant="body" fontType="medium" >
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
  fieldName: keyof T & string
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
  formik: FormikProps<T>
) => {
  return {
    onPress: formik.handleSubmit,
    disabled: formik.isSubmitting || !formik.isValid,
    loading: formik.isSubmitting,
  };
};