/**
 * This type defines browser cookie.
 */
type Cookie = {
    name: string,
    value: string,
    days: number,
    path?: string,
    secure?: boolean,
    httpOnly?: boolean
}

export default Cookie;
