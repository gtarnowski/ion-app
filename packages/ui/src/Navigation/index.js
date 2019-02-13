import React from 'react';
import PropTypes from 'prop-types'
import { Favorite, AccountCircle, ShoppingCart, Search as SearchIcon} from '@material-ui/icons'
import {AppBar, Toolbar, Badge, Typography, IconButton, InputBase} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'

const Navigation = ({title, favouritesItemsCount, cartItemsCount, classes: {grow, typography, search, searchIcon, inputRoot, inputInput, appBar }}) => (
    <AppBar position="static" color="default" className={appBar}>
        <Toolbar>
            <Typography variant="h5" color="inherit" className={typography}>
                {title}
            </Typography>
            <div className={grow}/>
            <div className={search}>
                <div className={searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: inputRoot,
                        input: inputInput,
                    }}
                />

            </div>
            <IconButton color="inherit">
                <AccountCircle/>
            </IconButton>
            <IconButton color="inherit">
                <Badge color="primary" badgeContent={favouritesItemsCount}>
                    <Favorite/>
                </Badge>
            </IconButton>
            <IconButton color="inherit">
                <Badge color="primary" badgeContent={cartItemsCount}>
                    <ShoppingCart/>
                </Badge>
            </IconButton>
        </Toolbar>
    </AppBar>
)

Navigation.defaultProps = {
    title: 'simple',
    favouritesItemsCount: 0,
    cartItemsCount: 0
}

Navigation.propTypes = {
    title: PropTypes.string,
    favouritesItemsCount: PropTypes.number,
    cartItemsCount: PropTypes.number
}

export default withStyles(styles)(Navigation)