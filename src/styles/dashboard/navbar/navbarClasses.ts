import { makeStyles } from '@material-ui/core/styles';

const useNavbarStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    intro: {
        textAlign: 'right'
    }
}));

export default useNavbarStyles;
