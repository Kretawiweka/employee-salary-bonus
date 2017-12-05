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
import EmployeImage from '../static/images/employee-google.jpg';
import 'typeface-roboto'
import Navbar from './components/Navbar';
import imageKurvaBonus from '../static/images/kurva-bonus.png';
import imageKurvaGaji from '../static/images/kurva-gaji.png';
import imageMasaKerja from '../static/images/masa-kerja.png';

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
      zTotal: '',
      alfaR1: '',
      zR1: '',
      alfaR2: '',
      zR2: '',
      alfaR3: '',
      zR3: '',
      alfaR4: '',
      zR4: '',
      alfaR5: '',
      zR5: '',
      alfaR6: '',
      zR6: ''
    }
  }

  handleChange(property, event) {
    this.setState({
      [property]: event.target.value
    });
  }

  handleReset = () => {
    this.setState({
      zTotal: '',
      alfaR1: '',
      zR1: '',
      alfaR2: '',
      zR2: '',
      alfaR3: '',
      zR3: '',
      alfaR4: '',
      zR4: '',
      alfaR5: '',
      zR5: '',
      alfaR6: '',
      zR6: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();    
    var masaKerja = this.state.masaKerja;
    var gajiPegawai = this.state.gajiPegawai;
    this.fuzzyTsukamotoAlgorithm(masaKerja, gajiPegawai);
  }

  fuzzyTsukamotoAlgorithm(masaKerja, gajiPegawai){
    // console.log('Masa Kerja: '+masaKerja+' || Gaji Pegawai: '+gajiPegawai)
    var alfa1 = this.alfaRule1(masaKerja, gajiPegawai);
    var z1 = this.zRule1(alfa1);
    var alfa2 = this.alfaRule2(masaKerja, gajiPegawai);
    var z2 = this.zRule2(alfa2);
    var alfa3 = this.alfaRule3(masaKerja, gajiPegawai);
    var z3 = this.zRule3(alfa3);
    var alfa4 = this.alfaRule4(masaKerja, gajiPegawai);
    var z4 = this.zRule4(alfa4);
    var alfa5 = this.alfaRule5(masaKerja, gajiPegawai);
    var z5 = this.zRule5(alfa5);
    var alfa6 = this.alfaRule6(masaKerja, gajiPegawai);
    var z6 = this.zRule6(alfa6);
    var zTotalResult = this.zTotal(alfa1, alfa2, alfa3, alfa4, alfa5, alfa6, z1, z2, z3, z4, z5, z6);
    this.setState({
      zTotal: zTotalResult
    })
  }
  //initial curve function
  //masa kerja
  masaKerjaBaru = (masaKerja) =>{
    let a = 2;
    let b = 5;
    let returnValue;
     if(masaKerja<a){
      returnValue = 1;
     }
     else if(masaKerja>b){
      returnValue = 0;
     }
     else{
      returnValue = ((b-masaKerja)/(b-a)) ;
     }
     console.log('masa kerja baru :'+returnValue);
     return returnValue;
  }
  masaKerjaSedang = (masaKerja) => {
    let a = 3;
    let b = 5;
    let c = 7;
    let returnValue;
    if(masaKerja<a || masaKerja>c){
      returnValue = 0;
    } 
    else if(masaKerja>=a && masaKerja<=b){
      returnValue = ((masaKerja-a)/(b-a));
    } 
    else{
      returnValue = ((c-masaKerja)/(c-b));
    }      
    console.log('masa kerja sedang: '+returnValue);
    return returnValue;    
  }
  masaKerjaLama = (masaKerja) => {
    let a = 5;
    let b = 8;
    let returnValue;
     if(masaKerja<a){
        returnValue = 1;
     }
     else if(masaKerja>b){
        returnValue = 0;
     }
     else{
      returnValue = ((b-masaKerja)/(b-a));
     }
     console.log('masa kerja lama: '+returnValue);
     return returnValue;
  }
  //gaji pegawai
  gajiPegawaiSedikit = (gaji) => {
    let a = 2000000;
    let b = 4000000;
    let returnValue;
     if(gaji<a){
        returnValue = 1;
     }
     else if(gaji>b){
        returnValue = 0;
     }
     else{
      returnValue = (b-gaji)/(b-a);
     }    
     console.log('gaji pegawai sedikit: '+returnValue);
     return returnValue;
  }
  gajiPegawaiBanyak = (gaji) => {
    let a = 3000000;
    let b = 5000000;
    let returnValue;
     if(gaji<a){
        returnValue = 1;
     }
     else if(gaji>b){
        returnValue = 0;
     }
     else{
      returnValue = ((b-gaji)/(b-a));
     }
     console.log('gaji pegawai banyak: '+returnValue);     
     return returnValue
  }

  //rule function
  //Rule 1 : Jika masa kerja baru dan gaji sedikit maka bonus sedikit
  alfaRule1 = (masaKerja, gajiPegawai) => {
    let masaKerjaBaru = this.masaKerjaBaru(masaKerja);
    // console.log(masaKerjaBaru);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    // console.log(gajiPegawaiSedikit)
    let alfa1 = Math.min(masaKerjaBaru, gajiPegawaiSedikit);
    this.setState({
      alfaR1: alfa1
    });
    return alfa1;
  }
  zRule1 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z1 = bonusBanyak-(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR1: z1
    });
    return z1;
  }
  //Rule 2 : Jika masa kerja baru dan gaji banyak maka bonus sedikit
  alfaRule2 = (masaKerja, gajiPegawai) => {
    let masaKerjaBaru = this.masaKerjaBaru(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    let alfa2 = Math.min(masaKerjaBaru, gajiPegawaiBanyak);
    console.log('masa kerja baru: '+masaKerjaBaru+' gaji pegawai banyak: '+gajiPegawaiBanyak);
    this.setState({
      alfaR2: alfa2
    });
    return alfa2;    
  }
  zRule2 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z2 = bonusBanyak-(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR2: z2
    })
    return z2;
  }
  //Rule 3 : Jika masa kerja sedang dan gaji sedikit maka bonus sedikit
  alfaRule3 = (masaKerja, gajiPegawai) => {
    let masaKerjaSedang = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    let alfa3 = Math.min(masaKerjaSedang, gajiPegawaiSedikit);
    this.setState({
      alfaR3: alfa3
    })
    return alfa3;
  }
  zRule3 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z3 = bonusBanyak-(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR3: z3
    })
    return z3;
  }
  //Rule 4 : Jika masa kerja sedang dan gaji banyak maka bonus banyak
  alfaRule4 = (masaKerja, gajiPegawai) => {
    let masaKerjaSedang = this.masaKerjaSedang(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    let alfa4 = Math.min(masaKerjaSedang, gajiPegawaiBanyak);
    this.setState({
      alfaR4: alfa4
    })
    return alfa4; 
  }
  zRule4 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z4 = bonusSedikit+(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR4: z4
    })
    return z4;    
  }
  //Rule 5 : Jika masa kerja lama dan gaji sedikit maka bonus banyak
  alfaRule5 = (masaKerja, gajiPegawai) => {
    let masaKerjaLama = this.masaKerjaLama(masaKerja);
    let gajiPegawaiSedikit = this.gajiPegawaiSedikit(gajiPegawai);
    let alfa5 = Math.min(masaKerjaLama, gajiPegawaiSedikit)
    this.setState({
      alfaR5: alfa5
    })
    return alfa5; 
  }
  zRule5 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z5 = bonusSedikit+(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR5: z5
    })
    return z5;
  }
  //Rule 6 : Jika masa kerja lama dan gaji banyak maka bonus banyak
  alfaRule6 = (masaKerja, gajiPegawai) => {
    let masaKerjaLama = this.masaKerjaLama(masaKerja);
    let gajiPegawaiBanyak = this.gajiPegawaiBanyak(gajiPegawai);
    let alfa6 = Math.min(masaKerjaLama, gajiPegawaiBanyak);
    // console.log('masa kerja lama: '+masaKerjaLama+' gaji pegawai banyak: '+gajiPegawaiBanyak);
    this.setState({
      alfaR6: alfa6
    })
    return alfa6; 
  }
  zRule6 = (x) => {
    let bonusBanyak = 600000;
    let bonusSedikit = 300000;
    let z6 = bonusSedikit+(x*(bonusBanyak-bonusSedikit));
    this.setState({
      zR6: z6
    })
    return z6;
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
            <Grid item xs={12} sm={5}>
              <CardContent>
                  <img src={EmployeImage} alt="employe" className={classes.imageHeader} />
              </CardContent>       
            </Grid>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                  Menghitung bonus gaji pegawai dengan menggunakan Algoritma Fuzzy Tsukamoto. Dengan menggunakan variabel masa kerja, kurva gaji, dan kurva bonus.
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={5}>
                    <img src={imageMasaKerja} alt="masa kerja" className={classes.imageHeader} />
                  </Grid>                  
                  <Grid item xs={4}>
                    <img src={imageKurvaGaji} alt="kurva gaji" className={classes.imageHeader} />
                  </Grid>
                  <Grid item xs={4}>
                    <img src={imageKurvaBonus} alt="kurva bonus" className={classes.imageHeader} />
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12}>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      <b>Rule adalah aturan yang dipakai dalam menentukan besaran bonus, yaitu</b>                       
                    </Typography>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 1 : Jika masa kerja baru dan gaji sedikit maka bonus sedikit
                    </Typography>                    
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R1 = {this.state.alfaR1}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R1 = {this.state.zR1}</h5>
                      </Grid>                      
                    </Grid>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 2 : Jika masa kerja baru dan gaji banyak maka bonus sedikit
                    </Typography>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R2 = {this.state.alfaR2}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R2 = {this.state.zR2}</h5>
                      </Grid>                      
                    </Grid>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 3 : Jika masa kerja sedang dan gaji sedikit maka bonus sedikit
                    </Typography>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R3 = {this.state.alfaR3}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R3 = {this.state.zR3}</h5>
                      </Grid>                      
                    </Grid>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 4 : Jika masa kerja sedang dan gaji banyak maka bonus banyak
                    </Typography>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R4 = {this.state.alfaR4}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R4 = {this.state.zR4}</h5>
                      </Grid>                      
                    </Grid>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 5 : Jika masa kerja lama dan gaji sedikit maka bonus banyak
                    </Typography>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R5 = {this.state.alfaR5}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R5 = {this.state.zR5}</h5>
                      </Grid>                      
                    </Grid>
                    <Typography type="subheading" gutterBottom color="inherit" className={classes.textContent}>
                      Rule 6 : Jika masa kerja lama dan gaji banyak maka bonus banyak
                    </Typography> 
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <h5>Alfa R6 = {this.state.alfaR6}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h5>Z R6 = {this.state.zR6}</h5>
                      </Grid>                      
                    </Grid>
                  </Grid>
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
                            <Button raised color="accent" onClick={this.handleReset.bind(this)}>
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