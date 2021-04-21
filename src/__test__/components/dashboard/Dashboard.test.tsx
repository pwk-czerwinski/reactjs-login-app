import React from 'react';
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import Dashboard from '../../../components/dashboard/Dashboard';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'token;9157bc44-2230-4831-a2b4-646ba039c03b',
});

it('should show user data in Navbar', async () => {
    mockedAxios.get.mockResolvedValue({
        data: {
            username: "admin",
            firstName: "John",
            lastName: "Doe",
        }
    });
    const { getByText } = render(<Dashboard />);
    await waitFor(() => expect(getByText('Welcome John Doe')).toBeInTheDocument());
});
