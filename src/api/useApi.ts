import axios, { AxiosInstance } from 'axios';
import useCancellablePromise from './useCancelablePromise';
import useCookies from '../shared/useCookies';
import Constants from '../shared/Constants';
import ApiT from '../types/ApiT';
import CookieT from '../types/CookieT';
import Cookie from '../types/Cookie';
import Urls from '../shared/Urls';

/**
 * Axios instance with base URL.
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
    },
})

/**
 * Hook responsible for delivering an easy way for communication with REST API.
 */
const useApi = (): ApiT => {
    const cookieInstance: CookieT = useCookies();
    const { cancellablePromise } = useCancellablePromise();

    /**
     * The function allows to login user identified by username and password.
     * @param username
     * @param password
     */
    const login = async (username: string, password: string) => {
        return cancellablePromise(axiosInstance
            .post(
                Urls.Login,
                {
                    username,
                    password
                }
            )
            .then(response => {
                cookieInstance.setCookie(
                    Constants.TOKEN_COOKIE_NAME,
                    response.data.token,
                    Constants.TOKEN_COOKIE_EXPIRATION_DAYS
                );

                return response;
            })
        );
    }

    /**
     * The function allows to log out currently logged-in user.
     */
    const logout = (): void => cookieInstance.removeCookie(Constants.TOKEN_COOKIE_NAME);

    /**
     * Returns user data.
     */
    const getUser = async () => {
        return cancellablePromise(withToken(axiosInstance)
            .get(Urls.User)
            .then(response => response)
        );
    }

    /**
     * Helper function which adds token to the given axios instance.
     * @param axiosInstance
     */
    const withToken = (axiosInstance: AxiosInstance) => {
        const tokenCookie: Cookie | null = cookieInstance.getCookie(Constants.TOKEN_COOKIE_NAME);

        if (!tokenCookie) {
            throw new Error('Token not found');
        }

        axiosInstance.defaults.headers.authorization = tokenCookie.value;

        return axiosInstance;
    }

    return { login, logout, getUser } as ApiT;
}

export default useApi;
