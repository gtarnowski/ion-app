import React from 'react';
import { addDecorator } from '@storybook/react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { theme } from './theme';
import './theme.css';
import 'reset-css';

const Provider = storyFn => <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>;
addDecorator(Provider);
