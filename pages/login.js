import {useState,useEffect} from 'react';
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container,Card,CardContent,Typography,Stack,Button, IconButton,OutlinedInput,InputLabel,InputAdornment,FormControl, Alert } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [values, setValues] = useState({
    password: '',
    email: '',
    weightRange: '',
    showPassword: false,
  });
  const [success,setSuccess]=useState('');

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
          <Typography marginTop={2} variant='h5' align='center'>Getting started with Linguaphile</Typography>
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
          
    <Button variant="contained" onClick={async()=>{
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN}`,{ email: values['email'], password: values['password'] })
      const data = response.data;
       setSuccess("success");
      localStorage.setItem('userID',data);
      router.push('/form');
      } catch (error) {
        setSuccess('error');
      }
      
   
    }}>Login</Button>
        {success!=''?<Alert severity={`${success}`}>{success.charAt(0).toUpperCase()+success.slice(1)}</Alert>:<br></br>}
          </Stack>

        </CardContent>
      </Card>
      </Container>

    </div>
  )
 
}
