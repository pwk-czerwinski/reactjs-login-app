import { renderHook } from '@testing-library/react-hooks';
import useCookies from '../../shared/useCookies';

Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: '',
});

test('should set cookie', () => {
    const { result } = renderHook(() => useCookies())
    result.current.setCookie('my-super-cookie', 'some-value-123', 10);

    const testCookie = result.current.getCookie('my-super-cookie');
    expect(testCookie?.name).toBe('my-super-cookie');
    expect(testCookie?.value).toBe('some-value-123');
});

test('should remove cookie', () => {
    const { result } = renderHook(() => useCookies())
    result.current.removeCookie('my-super-cookie');

    expect(result.current.getCookie('my-super-cookie')?.value).toBe('');
});
