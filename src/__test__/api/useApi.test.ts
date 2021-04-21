import axios from 'axios';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useApi from '../../api/useApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: '',
});

test('should login user and return token', async () => {
    mockedAxios.post.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.post.mockResolvedValue({ data: { token: '9157bc44-2230-4831-a2b4-646ba039c03b' } });
    const { result } = renderHook(() => useApi());
    const result2 = await result.current.login('username', 'password');

    await waitFor(() => {
        expect(result2.data.token).toBe('9157bc44-2230-4831-a2b4-646ba039c03b');
    });
});

test('should get user data', async () => {
    mockedAxios.get.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.get.mockResolvedValue({ data: { username: "admin", firstName: "John", lastName: "Doe" } });
    const { result } = renderHook(() => useApi());
    const result2 = await result.current.getUser();

    await waitFor(() => {
        expect(result2.data.username).toBe('admin');
        expect(result2.data.firstName).toBe('John');
        expect(result2.data.lastName).toBe('Doe');
    });
});
