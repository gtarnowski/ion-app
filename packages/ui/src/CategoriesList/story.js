import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { theme } from '../theme'
import CategoriesList from './index';


storiesOf('CategoriesList', module)
    .addDecorator(muiTheme(theme))
    .add('default', () => <CategoriesList />)

