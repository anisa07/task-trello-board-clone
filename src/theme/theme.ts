import { lightColors } from "@anisa07/design-package-app-test";
import { createMuiTheme } from '@material-ui/core/styles';

export const lightColorTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Coming Soon',
        ].join(','),
    },
    palette: {
        primary: {
            main: lightColors.primary,
        },
        warning: {
            main: lightColors.warning,
        },
        secondary: {
            main: lightColors.secondary,
        },
        error: {
            main: lightColors.error
        },
        info: {
            main: lightColors.info
        },
        type: "light",
    },
})
