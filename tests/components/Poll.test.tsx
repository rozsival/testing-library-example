/**
 * Test for 2. Form
 */
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Poll } from '../../src/components/Poll';

describe('components/Poll', () => {
  it('should render the Poll component', () => {
    render(<Poll />);
    expect(screen.getByTestId('title')).toHaveTextContent('Poll');
  });

  it('should handle full name change', () => {
    render(<Poll />);
    const input = screen.getByTestId('full-name');
    userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('should handle years of service change', () => {
    render(<Poll />);
    const input = screen.getByTestId('years-of-service');
    userEvent.type(input, '10');
    expect(input).toHaveValue(10);
  });

  it('should handle form submission', async () => {
    render(<Poll />);
    userEvent.type(screen.getByTestId('full-name'), 'Test');
    userEvent.type(screen.getByTestId('years-of-service'), '10');
    userEvent.click(screen.getByTestId('submit'));

    expect(await screen.findByTestId('acknowledgement')).toHaveTextContent(
      'Thank you Test for great 10 years of service.',
    );
  });
});
