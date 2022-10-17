/**
 * Test for 3. Events
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdvancedGreeter } from '../../src/components/AdvancedGreeter';

describe('components/AdvancedGreeter', () => {
  it('should handle name change correctly', () => {
    render(<AdvancedGreeter />);
    const input = screen.getByLabelText('name-input');
    userEvent.type(input, 'John');
    expect(input).toHaveValue('John');
  });

  it('should handle personal message change correctly', () => {});

  it('should handle formal change correctly', () => {});

  it('should handle form submission correctly', async () => {
    render(<AdvancedGreeter />);
    userEvent.type(screen.getByLabelText('name-input'), 'John');
    userEvent.click(screen.getByLabelText('submit-button'));
    await waitFor(
      () => {
        expect(screen.getByText('Whazzup 😎, John?')).toBeInTheDocument();
      },
      { timeout: 1200 },
    );
  });
});
