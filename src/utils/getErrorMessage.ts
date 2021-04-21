/**
 * Returns error message depending on a received error from the server.
 */
const getErrorMessage = (error: string): string => {
    switch (error) {
        case 'Wrong credentials':
            return 'The username or password you entered is incorrect';
        case 'Wrong data':
            return 'Please fill up username and password'
        default:
            return 'Unknown error, please try later'
    }
}

export default getErrorMessage;
