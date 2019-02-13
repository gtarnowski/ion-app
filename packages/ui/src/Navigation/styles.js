import {fade} from "@material-ui/core/styles/colorManipulator";

export default theme => ({
    appBar: {
        boxShadow: "0 -1px 13px 0 rgba(0, 0, 0, 0.2)",
    },
    grow: {
        flexGrow: 1,
    },
    typography: {
        fontWeight: 'bold',
        flexGrow: 1,
    },
    search: {
        display: 'none',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.4),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.6),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },

    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});