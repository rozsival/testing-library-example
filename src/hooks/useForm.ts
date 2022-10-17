import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { isObjectEmpty } from '../utils';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<T>;
}

export const useForm = <T>({ initialValues, validate }: UseFormOptions<T>) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean | undefined>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errors: Partial<T> = validate ? validate(values) : {};
  const valid = isObjectEmpty(errors);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { type, name } = e.target;

    const getValue = () => {
      if (type === 'checkbox') {
        return e.target.checked;
      }
      return e.target.value;
    };

    const value = getValue();
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit =
    (onSubmit: (values: T) => Promise<void>): FormEventHandler =>
    async (e) => {
      e.preventDefault();
      if (valid) {
        setIsSubmitting(true);
        await onSubmit(values);
        setIsSubmitting(false);
      } else {
        console.error(errors);
      }
    };

  return {
    values,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    valid,
    touched,
    isSubmitting,
  };
};
