import { deepOrange } from '@material-ui/core/colors';
import lightTheme from './light.theme';

export const { 500: ERROR_MAIN } = deepOrange;
export const INITIAL_PALETTE_TYPE = 'light';

export default {
  palette: {
    error: {
      main: ERROR_MAIN
    }
  },
  ...lightTheme,
  typography: {
    fontFamily: "'Open Sans', Roboto, sans-serif",
    button: {
      textTransform: 'none'
    }
  }
};
