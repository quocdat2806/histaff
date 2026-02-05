import * as yup from 'yup';
const approveSchema = yup.object({
  reason: yup.string().required('This field is required'),
});

export type ApproveFormValues = yup.InferType<typeof approveSchema>;

export const useApprove = () => {
  const initialValues: ApproveFormValues = {
    reason: '',
  };

  const handleSubmit = (values: ApproveFormValues) => {
    console.log(values);
  };

  return {
    initialValues,
    handleSubmit,
    schema: approveSchema,
  };
};
