import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFC107',
      light: '#FFECB3',
      dark: '#FFA000',
      contrastText: '#212121',
    },
    secondary: {
      light: '#',
      main: '#444444',
      dark: '#212121',
      contrastText: '#757575',
    }
  },
});
