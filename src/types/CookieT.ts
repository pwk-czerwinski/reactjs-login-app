import Cookie from './Cookie';

/**
 * This type defines what should be returned by the useCookies hook.
 */
type CookieT = {
    setCookie: (
        name: string,
        value: string,
        days: number,
        path?: string,
        secure?: boolean,
        httpOnly?: boolean
    ) => void;
    getCookie: (name: string) => Cookie | null;
    removeCookie: (name: string) => void;
}

export default CookieT;
