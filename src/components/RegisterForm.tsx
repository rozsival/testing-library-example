import { ChangeEventHandler, FormEvent } from 'react';
import { RegistrationBody } from '../api';

export type RegisterFormProps = {
  values: RegistrationBody;
  onChange: ChangeEventHandler;
  onSubmit: (e: FormEvent) => Promise<void> | void;
  isSubmitting: boolean;
};

export const RegisterForm = ({
  values,
  onChange,
  onSubmit,
  isSubmitting,
}: RegisterFormProps) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        aria-label="name-input"
        className="input"
        disabled={isSubmitting}
        name="name"
        onChange={onChange}
        placeholder="Name"
        type="text"
        value={values.name}
      />
      <input
        aria-label="email-input"
        className="input"
        disabled={isSubmitting}
        name="email"
        onChange={onChange}
        placeholder="Email"
        type="email"
        value={values.email}
      />
      <button className="button" disabled={isSubmitting} onClick={onSubmit}>
        Register
      </button>
      {isSubmitting && (
        <div className="overlay">
          <img
            aria-label="loading-indicator"
            className="loading"
            alt="loading"
            src="/loading.gif"
          />
        </div>
      )}
    </form>
  );
};
