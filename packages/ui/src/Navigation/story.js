import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import Navigation from './index';
import { theme } from '../theme'


storiesOf('Navigation', module)
  .addDecorator(muiTheme(theme))
  .add('default', () => <Navigation />)
  .add('with title', () => <Navigation title="ion-shop" />)
  .add('with fav and cart label', () => <Navigation cartItemsCount={2} favouritesItemsCount={3} />);
