/**
 * Test for 5. Hooks
 */
import { renderHook, act } from '@testing-library/react';
import { ChangeEvent, FormEvent } from 'react';

import { useForm } from '../../src/hooks';

const initialValues = {
  name: 'name',
  email: 'john.doe@example.com',
  agreement: false,
};

describe('hooks/useForm', () => {
  it('should handle form blur', () => {
    const { result } = renderHook(() =>
      useForm<typeof initialValues>({ initialValues }),
    );
    act(() => {
      result.current.handleBlur({
        target: { name: 'name' },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.touched.name).toBe(true);
  });

  it('should handle form input change correctly', () => {
    const { result } = renderHook(() =>
      useForm<typeof initialValues>({ initialValues }),
    );
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'jimmy' },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.name).toBe('jimmy');
  });

  it('should handle form checkbox change correctly', () => {
    const { result } = renderHook(() =>
      useForm<typeof initialValues>({ initialValues }),
    );
    act(() => {
      result.current.handleChange({
        target: { name: 'agreement', checked: true, type: 'checkbox' },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.agreement).toBe(true);
  });

  it('should handle failed form submission', () => {
    const { result } = renderHook(() =>
      useForm<typeof initialValues>({
        initialValues,
        validate: () => ({ name: 'name error' }),
      }),
    );
    act(() => {
      const handleSubmit = result.current.handleSubmit(
        jest.fn(() => Promise.resolve()),
      );
      handleSubmit({ preventDefault: jest.fn() } as unknown as FormEvent);
    });
    expect(result.current.errors.name).toBe('name error');
  });

  it('should handle successful form submission', async () => {
    const { result } = renderHook(() =>
      useForm<typeof initialValues>({
        initialValues,
        validate: () => ({}),
      }),
    );
    await act(async () => {
      const handleSubmit = result.current.handleSubmit(
        jest.fn(() => Promise.resolve()),
      );
      await handleSubmit({ preventDefault: jest.fn() } as unknown as FormEvent);
    });
    expect(result.current.errors).toEqual({});
  });
});
