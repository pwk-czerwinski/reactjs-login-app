import { createContext } from 'react';
import User from '../types/User';

/**
 * This context contains data related to user.
 */
const UserContext = createContext({} as User);

export default UserContext;
