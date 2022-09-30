import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import styles from '../styles/Home.module.css'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container,Card,CardContent,Typography,Stack,Button, Alert } from '@mui/material';

export default function Signup() {
  const [roles,setRoles]=React.useState([]);
  const [radios,setRadio]=React.useState('');
  const [success,setSuccess]=React.useState('');
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    weightRange: '',
    showPassword: false,
  });
  React.useEffect(()=>{
  fetchall();
  },[]);

function fetchall(){
  fetch("http://localhost:4000/api/getroles", {
    // mode: "no-cors",
    method: "GET",
   // headers: {
   //   Accept: "application/json, text/plain, */*",
   //   "Content-Type": "application/json",
  //  },
    // body:({email:email, password:password})
  })
    .then((res) => res.json())
    .then((data) => {
      data=data.map((val)=>{
        return val['role_name'];
      })
      setRoles([...data]);
      console.log(data);
    });

}


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const radioChange = (event) => {
    setRadio(event.target.value);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <Container maxWidth='sm' >
      <Card variant="outlined">
        <CardContent>
          <Typography marginTop={2} variant='h5' align='center'>Getting started with Linguista</Typography>
          <Stack direction={'column'} justifyContent='center' spacing={3} marginTop={3} marginLeft={10} marginRight={10} paddingBottom={3}>
          <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type='text'
            value={values.weight}
            onChange={handleChange('email')}
            label='Email'
          />
        </FormControl>
                  <FormControl  variant="outlined">

          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
           <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          /></FormControl>
          <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Roles</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {roles.map((val)=>{
          return ( <FormControlLabel value={`${val}`} control={<Radio />} label={`${val}`} onChange={radioChange} />)
        })}
      </RadioGroup>
    </FormControl>
<Button  variant="outlined" onClick={()=>{
      fetch("http://localhost:4000/api/newuser", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values['email'], password: values['password'],role:radios }),
        // body:({email:email, password:password})
      })
        .then((res) => {
          if(res.status==200){
              setSuccess("success");

          }
          else{
            setSuccess('error');
          }
          
        })


}}>Sign Up</Button>
    {success!=''?<Alert severity={`${success}`}>{success.charAt(0).toUpperCase()+success.slice(1)}</Alert>:<br></br>}
          </Stack>

        </CardContent>
      </Card>
      </Container>

    </div>
  )
 
}
