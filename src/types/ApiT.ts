/**
 * This type defines what should be returned by the useApi hook.
 */
type ApiT = {
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
    getUser: () => Promise<any>;
}

export default ApiT;
