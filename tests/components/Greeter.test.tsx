/**
 * Test for 1. Basic
 */
import { render, screen } from '@testing-library/react';

import { Greeter } from '../../src/components/Greeter';

describe('components/Greeter', () => {
  it('should display fallback text when name not provided', () => {
    render(<Greeter />);
    expect(
      screen.getByText('Before I greet you, I need to know your name 👋'),
    ).toBeInTheDocument();
  });

  it('should display formal greeting', () => {
    const name = 'test name';
    render(<Greeter name={name} formal />);
    expect(screen.getByText(`Hello, ${name}!`)).toBeInTheDocument();
  });

  it('should display informal greeting', () => {
    const name = 'test name';
    render(<Greeter name={name} />);
    expect(screen.getByText(`Whazzup 😎, ${name}?`)).toBeInTheDocument();
  });

  it('should display personal message', () => {
    const name = 'test name';
    render(
      <Greeter name={name} personalMessage="It was a pleasure to greet you." />,
    );
    expect(
      screen.getByText('It was a pleasure to greet you.'),
    ).toBeInTheDocument();
  });
});
