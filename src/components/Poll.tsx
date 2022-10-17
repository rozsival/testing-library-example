import { MouseEvent, useState } from 'react';

export const Poll = () => {
  const [fullName, setFullName] = useState('');
  const [yearsOfService, setYearsOfService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <h4 data-testid="title">Poll</h4>
      {isSubmitted ? (
        <h5 data-testid="acknowledgement">
          Thanks you {fullName} for great {yearsOfService} years of service.
        </h5>
      ) : (
        <form className="form">
          <input
            className="input"
            data-testid="full-name"
            id="full-name"
            name="full-name"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            type="text"
            value={fullName}
          />
          <input
            className="input"
            data-testid="years-of-service"
            id="years-of-service"
            name="years-of-service"
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="Years of service"
            type="number"
            value={yearsOfService}
          />
          <button
            className="button"
            data-testid="submit"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};
