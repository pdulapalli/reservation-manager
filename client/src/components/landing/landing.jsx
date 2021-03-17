import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { styleGen } from './styles'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styleGen)

export function Landing() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Reservation Manager
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Book reservations for guests and set inventory capacity.
        Enjoy!
      </Typography>
    </Container>
  );
}