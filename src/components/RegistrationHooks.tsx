import { useState } from 'react';
import { register, RegistrationBody } from '../api';
import { useForm } from '../hooks';
import { Greeter } from './Greeter';
import { RegisterForm } from './RegisterForm';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validate = (values: RegistrationBody) => {
  const errors: Partial<RegistrationBody> = {};
  if (!values.name) {
    errors.name = 'Name is required.';
  }
  if (!values.email) {
    errors.email = 'Email is required.';
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email format.';
  }
  return errors;
};

const initialValues = { name: '', email: '' };

export const RegistrationHooks = () => {
  const { values, handleChange, handleSubmit, isSubmitting } =
    useForm<RegistrationBody>({
      initialValues,
      validate,
    });
  const [isRegistered, setIsRegistered] = useState(false);

  const submitRegistration = async (values: RegistrationBody) => {
    await register(values);
    setIsRegistered(true);
  };

  return (
    <>
      {isRegistered ? (
        <Greeter
          name={values.name}
          personalMessage={`The confirmation email has been sent to ${values.email}`}
        />
      ) : (
        <RegisterForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit(submitRegistration)}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};
