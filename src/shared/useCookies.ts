import CookieT from '../types/CookieT';
import Cookie from '../types/Cookie';

/**
 * Hook responsible for handling browser cookies.
 */
const useCookies = () => {
    /**
     * Sets cookie.
     * @param name
     * @param value
     * @param days
     * @param path
     * @param secure
     * @param httpOnly
     */
    const setCookie = (
        name: string,
        value: string,
        days: number,
        path: string = '/',
        secure: boolean = true,
        httpOnly: boolean = false
    ): void => {
        if (!navigator.cookieEnabled) {
            return;
        }

        let text = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        const date = new Date();
        date.setTime(date.getTime() + (days * 24*60*60*1000));
        text += `; expires=${date.toUTCString()}`;
        text += `; path=${path}`;

        if (secure) {
            text += '; secure';
        }

        if (httpOnly) {
            text += '; httpOnly';
        }

        document.cookie = text;
    }

    /**
     * Returns cookies.
     */
    const getCookies = (): Cookie[] => {
        if (!document.cookie) {
            return [];
        }

        const result: Cookie[] = [];
        document.cookie.split(/;\x20*/).forEach(cookie => {
            const [ name, value ] = cookie.split('=');

            if (!['expires', 'path', 'secure', 'httpOnly'].includes(name)) {
                let nextCookie = {} as Cookie;
                nextCookie.name = decodeURIComponent(name);
                nextCookie.value = decodeURIComponent(value);
                result.push(nextCookie);
            }
        });

        return result;
    }

    /**
     * Returns cookie for given name.
     * @param name
     */
    const getCookie = (name: string): Cookie | null => {
        const foundCookies = getCookies()
            .filter(currCookie => currCookie.name === name);

        return foundCookies.length > 0 ? foundCookies[0] : null;
    }

    /**
     * Removes cookie for given name.
     * @param name
     */
    const removeCookie = (name: string): void => {
        name = encodeURIComponent(name);
        document.cookie = `${name}=; expires=${new Date(0).toUTCString()}`;
    }

    return { setCookie, getCookie, removeCookie } as CookieT;
}

export default useCookies;
