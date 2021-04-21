import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useApi from '../api/useApi';
import AuthContext from '../state/AuthContext';
import Routes from '../routes/Routes';
import LoginT from '../types/LoginT';
import ApiT from '../types/ApiT';
import getErrorMessage from '../utils/getErrorMessage';

/**
 * Validation schema for login form.
 */
const validationSchema = yup.object({
    username: yup
        .string()
        .min(4, 'Username should be of minimum 4 characters length')
        .max(10, 'Username should be of maximum 10 characters length')
        .required('Username is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .max(12, 'Password should be of maximum 12 characters length')
        .required('Password is required'),
});

/**
 * This hook contains the logic responsible for handling the login form (form validation, sending data to the server).
 */
const useLogin = (): LoginT => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => submit(values, actions),
    });
    const history = useHistory();
    const api: ApiT = useApi();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [ error, setError ] = useState<string>('');
    const [ errorOccurred, setErrorOccurred ] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            setError('');
            setErrorOccurred(false);
        }

        // eslint-disable-next-line
    }, [formik.values]);

    const submit = (values: any, actions: any) => {
        api.login(values.username, values.password)
            .then((response) => {
                actions.setSubmitting(false);

                if (response) {
                    setIsAuthenticated(true);
                    history.push(Routes.Dashboard);
                }
            })
            .catch(err => {
                actions.setSubmitting(false);
                setErrorOccurred(true);
                setError(getErrorMessage(err?.response?.data));
            });
    }

    return { formik, errorOccurred, error } as LoginT;
}

export default useLogin;
