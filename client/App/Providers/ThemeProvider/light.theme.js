import { indigo, grey, pink, blue } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles';

const { A100: LIGHT_SECONDARY_MAIN } = blue;
const LIGHT_BACKGROUND = '#fafafa';

export default {
  palette: {
    type: 'light',
    primary: {
      main: '#1648ff'
    },
    secondary: {
      main: LIGHT_SECONDARY_MAIN
    }
  },
  background: {
    default: LIGHT_BACKGROUND
  }
};
