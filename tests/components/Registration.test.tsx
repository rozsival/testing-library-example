/**
 * Test for 4. Mocking
 */
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Registration } from '../../src/components/Registration';

const formFields = [
  ['name', 'test name'],
  ['email', 'john.doe@example.com'],
];

describe('components/Registration', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it.each(formFields)('should handle %s change correctly', (name, value) => {
    render(<Registration />);
    const input = screen.getByLabelText(`${name}-input`);
    fireEvent.input(input, { target: { value } });
  });

  it('should handle failed form submission correctly', async () => {
    render(<Registration />);
    const button = screen.getByText('Register');

    jest.useFakeTimers();
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      // @ts-expect-error: We're mocking only the parts of `fetch` we really use
      Promise.resolve({
        json: () => Promise.reject(new Error('Test error')),
      }),
    );
    fireEvent.click(button, { preventDefault: jest.fn() });
    await waitForElementToBeRemoved(
      () => screen.queryByLabelText('loading-indicator'),
      { timeout: 2000 },
    );
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('should handle successful form submission', async () => {
    render(<Registration />);
    const button = screen.getByText('Register');
    jest.useFakeTimers();
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      // @ts-expect-error: We're mocking only the parts of `fetch` we really use
      Promise.resolve({ json: () => Promise.resolve({ id: 1 }) }),
    );
    fireEvent.input(screen.getByLabelText('name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText('email-input'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.click(button, { preventDefault: jest.fn() });
    await waitForElementToBeRemoved(
      () => screen.queryByLabelText('loading-indicator'),
      { timeout: 2000 },
    );
    expect(screen.getByText('Whazzup 😎, John Doe?')).toBeInTheDocument();
  });
});
