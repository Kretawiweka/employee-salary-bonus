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
    this.state = {
      zTotal: ''
    }
  }

  handleChange(property, event) {
    this.setState({
      [property]: event.target.value
    });
  }

  handleReset = () => {
    this.setState({
      zTotal: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();    
    var masaKerja = this.state.masaKerja;
    var gajiPegawai = this.state.gajiPegawai;
    this.setState({
      zTotal: 10000
    })
    this.fuzzyTsukamotoAlgorithm(masaKerja, gajiPegawai);
  }

  fuzzyTsukamotoAlgorithm(masaKerja, gajiPegawai){
    console.log('Masa Kerja: '+masaKerja+' || Gaji Pegawai: '+gajiPegawai)
    var miu1 = this.miuRule1(masaKerja, gajiPegawai);
    var z1 = this.zRule1(miu1);
    var miu2 = this.miuRule2(masaKerja, gajiPegawai);
    var z2 = this.zRule2(miu2);
    var miu3 = this.miuRule3(masaKerja, gajiPegawai);
    var z3 = this.zRule3(miu3);
    var miu4 = this.miuRule4(masaKerja, gajiPegawai);
    var z4 = this.zRule4(miu4);
    var miu5 = this.miuRule5(masaKerja, gajiPegawai);
    var z5 = this.zRule5(miu5);
    var miu6 = this.miuRule6(masaKerja, gajiPegawai);
    var z6 = this.zRule6(miu6);
    var zTotalResult = this.zTotal(miu1, miu2, miu3, miu4, miu5, miu6, z1, z2, z3, z4, z5, z6);
    this.setState({
      zTotal: zTotalResult
    })
  }
  //initial curve function
  //masa kerja
  masaKerjaBaru = (masaKerja) =>{
    let a = 2;
    let b = 5;
     if(masaKerja<a){
        return 1;
     }
     else if(masaKerja>b){
        return 0;
     }
     else{
      return ((b-masaKerja)/(b-a));
     }
  }
  masaKerjaSedang = (masaKerja) => {
    let a = 3;
    let b = 5;
    let c = 7;
    if(masaKerja<a || masaKerja>c){
      return 0;
    } 
    else if(masaKerja>=a && masaKerja<=b){
      return ((masaKerja-a)/(b-a));
    } 
    else{
      return ((c-masaKerja)/(c-b));
    }  
  }
  masaKerjaLama = (masaKerja) => {
    let a = 5;
    let b = 8;
     if(masaKerja<a){
        return 1;
     }
     else if(masaKerja>b){
        return 0;
     }
     else{
      return ((b-masaKerja)/(b-a));
     }
  }
  //gaji pegawai
  gajiPegawaiSedikit = (gaji) => {
    let a = 2000000;
    let b = 4000000;
     if(gaji<a){
        return 1;
     }
     else if(gaji>b){
        return 0;
     }
     else{
      return ((b-gaji)/(b-a));
     }    
  }
  gajiPegawaiBanyak = (gaji) => {
    let a = 3000000;
    let b = 5000000;
     if(gaji<a){
        return 1;
     }
     else if(gaji>b){
        return 0;
     }
     else{
      return ((b-gaji)/(b-a));
     }
  }

  //rule function
  //Rule 1 : Jika masa kerja baru dan gaji sedikit maka bonus sedikit
  miuRule1 = (masaKerja, gajiPegawai) => {
    let masaKerjaBaru = this.masaKerjaBaru(masaKerja);
    console.log(masaKerjaBaru);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    console.log(gajiPegawaiSedikit)
    return Math.min(masaKerjaBaru, gajiPegawaiSedikit);
  }
  zRule1 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }
  //Rule 2 : Jika masa kerja baru dan gaji banyak maka bonus sedikit
  miuRule2 = (masaKerja, gajiPegawai) => {
    let masaKerjaBaru = this.masaKerjaBaru(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    return Math.min(masaKerjaBaru, gajiPegawaiBanyak);    
  }
  zRule2 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }
  //Rule 3 : Jika masa kerja sedang dan gaji sedikit maka bonus sedikit
  miuRule3 = (masaKerja, gajiPegawai) => {
    let masaKerjaSedang = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    return Math.min(masaKerjaSedang, gajiPegawaiSedikit);
  }
  zRule3 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }
  //Rule 4 : Jika masa kerja sedang dan gaji banyak maka bonus banyak
  miuRule4 = (masaKerja, gajiPegawai) => {
    let masaKerjaSedang = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    return Math.min(masaKerjaSedang, gajiPegawaiBanyak); 
  }
  zRule4 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }
  //Rule 5 : Jika masa kerja lama dan gaji sedikit maka bonus banyak
  miuRule5 = (masaKerja, gajiPegawai) => {
    let masaKerjaLama = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    return Math.min(masaKerjaLama, gajiPegawaiSedikit); 
  }
  zRule5 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }
  //Rule 6 : Jika masa kerja lama dan gaji banyak maka bonus banyak
  miuRule6 = (masaKerja, gajiPegawai) => {
    let masaKerjaLama = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    return Math.min(masaKerjaLama, gajiPegawaiBanyak); 
  }
  zRule6 = (x) => {
    let gajiBanyak = 6000000;
    let gajiSedikit = 3000000;
    return gajiBanyak-(x*(gajiBanyak-gajiSedikit));
  }

  zTotal = (miu1, miu2, miu3, miu4, miu5, miu6, z1, z2, z3, z4, z5, z6) => {
    var zTotal = ((miu1*z1)+(miu2*z2)+(miu3*z3)+(miu4*z4)+(miu5*z5)+(miu6*z6))/(miu1+miu2+miu3+miu4+miu5+miu6);
    return zTotal;
  };
  
  render(){
    const {classes} = this.props;    
    return (
      <div>
        <Navbar/>
        <Card className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                  <img src={EmployeImage} alt="employe" className={classes.imageHeader} />
              </CardContent>       
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Typography>
                <hr/>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="masaKerja"
                          label="Masa Kerja"
                          type="number"
                          onChange={this.handleChange.bind(this, 'masaKerja')}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textLabel
                          }}
                          InputProps={{
                            className: classes.textInput,
                          }}
                          placeholder="masa kerja pegawai (dalam tahun)"
                          required
                        />  
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="gaji"
                          label="Gaji Pegawai"
                          type="number"
                          onChange={this.handleChange.bind(this, 'gajiPegawai')}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textLabel
                          }}
                          InputProps={{
                            className: classes.textInput
                          }}
                          placeholder="gaji pegawai per bulan (dalam rupiah)"
                          required
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
                            <Button 
                              raised color="primary"
                              type="submit"          
                            >
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
                      <Typography 
                        type="headline" 
                        gutterBottom
                        id='resultZ'
                        >           
                        {this.state.zTotal}             
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