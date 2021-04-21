import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../../components/login/LoginForm';

Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'token;9157bc44-2230-4831-a2b4-646ba039c03b',
});

it('should inform user that username and password are required', async () => {
    const { getByText } = render(<LoginForm />);

    act(() => {
        userEvent.click(getByText(/Sign In/));
    });

    await waitFor(() => {
        expect(getByText('Username is required')).toBeInTheDocument();
    });
    expect(getByText('Password is required')).toBeInTheDocument();
});

it('should inform user that username is too short and password is required', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />);
    const usernameInput = (getByPlaceholderText('Username') as HTMLInputElement);
    userEvent.type(usernameInput, 'ab');
    userEvent.click(getByText(/Sign In/));

    await waitFor(() => {
        expect(getByText('Username should be of minimum 4 characters length')).toBeInTheDocument();
    });
    expect(getByText('Password is required')).toBeInTheDocument();
});

it('should inform user that username is too long and password is required', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />);
    const usernameInput = (getByPlaceholderText('Username') as HTMLInputElement);
    userEvent.type(usernameInput, 'username1234');
    userEvent.click(getByText(/Sign In/));

    await waitFor(() => {
        expect(getByText('Username should be of maximum 10 characters length')).toBeInTheDocument();
    });
    expect(getByText('Password is required')).toBeInTheDocument();
});
