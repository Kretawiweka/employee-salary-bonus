// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from 'material-ui';
import 'typeface-roboto'
import Work from 'material-ui-icons/Work';

const styles = theme => ({
  root: {
    width: '100%',
  },
  textContent: {
    marginLeft: 20,
    marginRight: 20
  }
});

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#00a5af" }}>
        <Toolbar>
          <IconButton aria-label="Share">
              <Work style={{ color:"white" }}/>
          </IconButton>
          <Typography type="title" color="inherit" align="">
            Employee Salary Bonus (Fuzy Tsukamoto Algorithm)
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);