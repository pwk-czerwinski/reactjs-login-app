import getErrorMessage from '../../utils/getErrorMessage';

it('should return information that incorrect username and password were entered',() => {
    expect(getErrorMessage('Wrong credentials')).toBe('The username or password you entered is incorrect');
});

it('should return information that inputs are empty',() => {
    expect(getErrorMessage('Wrong data')).toBe('Please fill up username and password');
});


it('should return information that error is unknown',() => {
    expect(getErrorMessage('Some test error')).toBe('Unknown error, please try later');
});
