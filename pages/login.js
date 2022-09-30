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
import {useRouter} from 'next/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container,Card,CardContent,Typography,Stack,Button } from '@mui/material';

export default function Login() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
          
    <Button variant="contained" onClick={()=>{
      
      fetch("http://localhost:4000/api/login", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values['email'], password: values['password'] }),
        // body:({email:email, password:password})
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('userID',data);
          router.push('/form');
        });


    }}>Login</Button>
          </Stack>

        </CardContent>
      </Card>
      </Container>

    </div>
  )
 
}
