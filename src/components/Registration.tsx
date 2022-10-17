import { ChangeEventHandler, FormEvent, useState } from 'react';
import { register, RegistrationBody } from '../api';
import { sleep } from '../utils';
import { Greeter } from './Greeter';
import { RegisterForm } from './RegisterForm';

export const Registration = () => {
  const [values, setValues] = useState<RegistrationBody>({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    await sleep(1);
    try {
      await register(values);
      setIsRegistered(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
    setIsSubmitting(false);
  };

  return isRegistered ? (
    <Greeter
      name={values.name}
      personalMessage={`The confirmation email has been sent to ${values.email}`}
    />
  ) : (
    <>
      <RegisterForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p>Error: {error}</p>}
    </>
  );
};
