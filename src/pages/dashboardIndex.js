// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  FormControl,
  TextField,
} from 'material-ui';
import EmployeImage from '../static/images/employee.jpg';
import 'typeface-roboto'
import Navbar from './components/Navbar';

const styles = {
  card: {
    maxWidth: '100%',
    marginTop: 20
  },
  imageHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width : '100%',
  },
  form: {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  formControl: {
    paddingTop: '15px'
  },
  textLabel: {
    fontSize: 20
  },
  textInput: {
    fontSize: 16
  },
};

class DashboardIndex extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {classes} = this.props;    
    return (
      <div>
        <Navbar/>
        <Card className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                  <img src={EmployeImage} className={classes.imageHeader} />
              </CardContent>       
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography type="subheading" gutterBottom align="justify" color="inherit" className={classes.textContent}>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Typography>
                <hr/>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <form className={classes.form}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="masaKerja"
                          label="Masa Kerja"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textLabel
                          }}
                          InputProps={{
                            className: classes.textInput,
                          }}
                          placeholder="Masukkan masa kerja pegawai"
                        />  
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="gaji"
                          label="Gaji Pegawai"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textLabel
                          }}
                          InputProps={{
                            className: classes.textInput
                          }}
                          placeholder="Masukkan gaji pegawai per bulan"
                        />
                      </FormControl>
                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth style={{marginTop: '10px'}}>
                            <Button raised color="accent">
                              Reset
                            </Button>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth style={{marginTop: '10px'}}>
                            <Button raised color="primary">
                              Calculate !
                            </Button>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </form>  
                  </Grid>     
                  <Grid item xs={12} sm={6}>
                    <div className={classes.form}>
                    <FormControl fullWidth className={classes.formControl}>
                      <Typography type="headline" gutterBottom>
                        Result :
                      </Typography>
                    </FormControl>                    
                    <FormControl fullWidth className={classes.formControl}>
                      <Typography type="headline" gutterBottom>
                        Rp 1000000
                      </Typography>
                    </FormControl>                    
                    </div>                  
                  </Grid>     
                </Grid>                  
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>
    );  
  }
}

DashboardIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardIndex);