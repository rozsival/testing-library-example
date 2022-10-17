import { FormEvent, useState } from 'react';
import { sleep } from '../utils';
import { Greeter, GreeterProps } from './Greeter';

export const AdvancedGreeter = () => {
  const [name, setName] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState<string>('');
  const [formal, setFormal] = useState<boolean>(false);
  const [greeterProps, setGreeterProps] = useState<GreeterProps>({ name: '' });

  const handleGreet = async (e: FormEvent) => {
    e.preventDefault();
    await sleep(1);
    setGreeterProps({
      name,
      personalMessage,
      formal,
    });
    setName('');
    setPersonalMessage('');
  };

  return (
    <>
      <form className="form" onSubmit={handleGreet}>
        <input
          aria-label="name-input"
          className="input"
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
        />
        <input
          aria-label="personal-message-input"
          className="input"
          id="personalMessage"
          onChange={(e) => setPersonalMessage(e.target.value)}
          placeholder="Personal message"
          type="text"
          value={personalMessage}
        />
        <div>
          <input
            aria-label="formal-checkbox"
            checked={formal}
            className="checkbox"
            id="formal"
            onChange={(e) => setFormal(e.target.checked)}
            type="checkbox"
          />
          <label htmlFor="formal">Formal</label>
        </div>
        <button
          aria-label="submit-button"
          className="button"
          onClick={handleGreet}
        >
          Greet !
        </button>
      </form>

      <Greeter {...greeterProps} />
    </>
  );
};
