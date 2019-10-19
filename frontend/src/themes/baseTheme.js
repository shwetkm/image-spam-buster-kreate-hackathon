import { createMuiTheme } from '@material-ui/core/styles';
import {
    blue,
    grey,
    deepOrange,
    red,
} from '@material-ui/core/colors';

const primaryColor = '#469DC7';
const hoverColor = '#3B8CB4';
const secondaryColor = '#3B8CB4';
const sectionHeaderHeight = '1rem';
const dialogTitleHeight = '2rem';
const fsDialogTitleHeight = '3rem';

const baseTheme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: {
            main: primaryColor,
        },
        primary1Color: '#469DC7',
        primary2Color: blue[700],
        primary3Color: grey[400],
        accent1Color: grey[500],
        accent2Color: grey[100],
        accent3Color: grey[500],
        primaryFontColor: '#7E7E7E',
        primaryBackground: '#6092c9',
        blueColor: '#3d6bbe',
        linkColor: '#6395CA',
        textColor: '#000000',
        buttonBackground: '#F5F843',
        addIconBackground: '#DDD600',
        alternateTextColor: '#FFFFFF',
        borderColor: '#0000003b',
        pickerHeaderColor: blue[600],
        disabledColor: ('#000000', 0.3),
        shadowColor: '#000000',
        primaryGradient: 'linear-gradient(to right, #1371a8, #326EBB, #306CB9, #8078d9)',
        labelColor: '#7e7e7e',
        secondaryTextColor: '#1AA0E4',
        // branding colors
        dialogHeaderColor: primaryColor,
        nuacarePrimaryColor: primaryColor,
        nuacareHoverColor: hoverColor,
        nuacareSecondaryColor: hoverColor,
    },
    warningColor: deepOrange[500],
    errorColor: red[500],
    textField: {

    },
    typography: {
        useNextVariants: true,
    },

    sectionBorderRadius: '0.4rem',
    sectionHeaderHeight,

    dialogTitle: {
        background: primaryColor,
        height: dialogTitleHeight,
        padding: '0.5rem 1rem',
    },

    fullScreenDialogTitle: {
        background: primaryColor,
        height: fsDialogTitleHeight,
        padding: '0.5rem 1rem',
    },
    primaryActionButton: {
        root: {
            backgroundColor: primaryColor,
            // minHeight: '2rem !important',
            padding: '4px 16px',
            '&:hover': {
                background: hoverColor,
            },
            fontWeight: 'normal',
        },
        label: {
            padding: '0.2rem 1.25rem',
            color: '#FFFFFF',
        },
    },
    secondaryButton: {
        root: {
            backgroundColor: '#ffffff',
            minWidth: '10.625rem',
            border: `1px solid ${primaryColor}`,
            padding: '4px 16px',
            // minHeight: '2rem !important',
            '&:hover': {
                background: '#F5F5F5',
            },
        },
        label: {
            padding: '0.2rem 1.25rem',
            color: primaryColor,
        },
    },

    disabledButton: {
        root: {
            backgroundColor: '#E0E0E0',
            border: '1px solid #BDBDBD',
            padding: '4px 16px',
            cursor: 'unset',
            fontWeight: 'normal',
            // minHeight: '2rem !important',
            '&:hover': {
                background: '#E0E0E0',
            },
        },
        label: {
            padding: '0.2rem 1.25rem',
            color: '#9E9E9E',
        },
    },

    navigationTabs: {
        container: {
            backgroundColor: hoverColor,
            width: '100%',
            minHeight: sectionHeaderHeight,
            boxShadow: 'none',
            color: '#FFFFFF',
        },
        tab: {
            minWidth: '8.5rem',
            color: '#666',
            opacity: '1',
            minHeight: '38px',
            padding: '0',
            '&:hover': {
                background: '#FFF',
                color: secondaryColor,
            },
        },
        selectedTab: {
            background: '#FFFFFF',
            color: primaryColor,
            '&:hover': {
                background: '#FFF',
                color: primaryColor,
            },
        },
    },
    overrides: {
        MuiTableCell: {
            root: {
                paddingTop: 4,
                paddingBottom: 4,
                paddingRight: 4,
                paddingLeft: 4,
                '&:last-child': {
                    paddingRight: 5,
                },
            },
        },
    },
});

export default baseTheme;
