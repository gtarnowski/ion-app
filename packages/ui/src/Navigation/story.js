import React from 'react'
import {storiesOf} from '@storybook/react' // eslint-disable-line import/no-extraneous-dependencies
import Navigation from './index'


storiesOf('Navigation', module)
    .add('default', () => (
        <Navigation />
    ))
    .add('with title', () => (
        <Navigation title="ion-shop" />
    ))
    .add('with fav and cart label', () => (
        <Navigation cartItemsCount={2} favouritesItemsCount={3}/>
    ))