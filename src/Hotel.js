import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from './Dialog'
const styles = {
  card: {
    margin: 8,
    display: 'inline-block'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes ,data,username,email} = props;
  console.log(data)
  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {data.hname}
          </Typography>
          <Typography component="p">
            {`${data.address} ,${data.city} ,${data.state}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Dialog email={email} username ={username} data={data}/>
        </CardActions>
      </Card>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);