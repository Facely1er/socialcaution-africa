import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from '../../hooks/useToast';

describe('useToast', () => {
  it('initializes with empty toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('info');
  });

  it('adds toast with custom type', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Success message', 'success');
    });

    expect(result.current.toasts[0].type).toBe('success');
  });

  it('removes a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message');
    });

    expect(result.current.toasts).toHaveLength(1);

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('shows success toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Success!');
    });

    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[0].message).toBe('Success!');
  });

  it('shows error toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.error('Error!');
    });

    expect(result.current.toasts[0].type).toBe('error');
    expect(result.current.toasts[0].message).toBe('Error!');
  });

  it('shows info toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.info('Info!');
    });

    expect(result.current.toasts[0].type).toBe('info');
    expect(result.current.toasts[0].message).toBe('Info!');
  });

  it('shows warning toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.warning('Warning!');
    });

    expect(result.current.toasts[0].type).toBe('warning');
    expect(result.current.toasts[0].message).toBe('Warning!');
  });

  it('generates unique toast IDs', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('First');
      result.current.addToast('Second');
    });

    expect(result.current.toasts[0].id).not.toBe(result.current.toasts[1].id);
    expect(result.current.toasts).toHaveLength(2);
  });
});
