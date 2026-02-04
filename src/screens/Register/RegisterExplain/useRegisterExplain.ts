import { useCallback } from 'react';
import * as yup from 'yup';
import { FormikProps } from 'formik';
import { useCalendarPicker } from '@/context/CalendarPickerContext';
import { useTimePicker } from '@/context/TimePickerContext';
import {
  RegisterLeaveFormValues,
  registerLeaveSchema,
} from '../RegisterLeave/useRegisterLeave';

export type DailyDeclaration = { morning: string; afternoon: string };

export const registerExplainSchema = yup.object({
  fromDate: yup.string().required('This field is required'),
  toDate: yup.string().required('This field is required'),
  reason: yup.string().required('This field is required'),
  leaveType: yup
    .string()
    .oneOf(['applySameType', 'declareByDay', 'declareByHour'])
    .required(),
  timeFrom: yup.string().required('This field is required'),
  timeTo: yup.string().required('This field is required'),
  dailyDeclarations: yup.object().optional().default({}),
});

export type RegisterExplainFormValues = Omit<
  yup.InferType<typeof registerExplainSchema>,
  'dailyDeclarations'
> & {
  dailyDeclarations: Record<string, DailyDeclaration>;
};

const WORK_TYPE_OPTIONS = [
  { label: 'Ca sáng', value: 'morning' },
  { label: 'Ca chiều', value: 'afternoon' },
  { label: 'Cả ngày', value: 'full' },
] as const;

export const useRegisterExplain = () => {
  const { openCalendarPicker } = useCalendarPicker();
  const { openTimePicker } = useTimePicker();

  const initialValues: RegisterLeaveFormValues = {
    fromDate: '',
    toDate: '',
    reason: '',
    leaveType: 'declareByDay',
    timeFrom: '',
    timeTo: '',
    dailyDeclarations: {},
  };

  const workTypeOptions = WORK_TYPE_OPTIONS.map(({ label, value }) => ({
    label,
    value,
  }));

  const handleSubmit = async (_value: RegisterLeaveFormValues) => {
    // TODO: handle submit
  };

  const handleOpenTimeFrom = (formik: FormikProps<RegisterLeaveFormValues>) => {
    openTimePicker({
      defaultTime: formik.values.timeFrom || undefined,
      onTimeChange: time => {
        formik.setFieldValue('timeFrom', time);
      },
    });
  };

  const handleOpenTimeTo = (formik: FormikProps<RegisterLeaveFormValues>) => {
    openTimePicker({
      defaultTime: formik.values.timeTo || undefined,
      onTimeChange: time => {
        formik.setFieldValue('timeTo', time);
      },
    });
  };
  const handleOpenCalendar = useCallback(
    (formik: FormikProps<RegisterLeaveFormValues>) => {
      openCalendarPicker({
        defaultDate: formik.values.fromDate || undefined,
        onDateChange: date => {
          formik.setFieldValue('fromDate', date);
        },
      });
    },
    [openCalendarPicker],
  );

  const handleOpenCalendarEndDate = useCallback(
    (formik: FormikProps<RegisterLeaveFormValues>) => {
      openCalendarPicker({
        defaultDate: formik.values.toDate || undefined,
        onDateChange: date => {
          formik.setFieldValue('toDate', date);
        },
      });
    },
    [openCalendarPicker],
  );

  return {
    schema: registerLeaveSchema,
    initialValues,
    handleSubmit,
    handleOpenCalendar,
    handleOpenCalendarEndDate,
    handleOpenTimeFrom,
    handleOpenTimeTo,
    workTypeOptions,
  };
};
