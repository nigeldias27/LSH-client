import {useState,useEffect} from 'react';
import styles from '../styles/Home.module.css'
import { Container, Card, CardContent, Typography, Stack, Button, TextField } from '@mui/material';
import axios from 'axios';
export default function Form(){
    useEffect(()=>{
        fetchinputs();
    },[])
    const [formlist,setFormlist] = useState([]);
    
    async function fetchinputs(){
        console.log(`${process.env.NEXT_PUBLIC_GETINPUTS}`+localStorage.getItem('userID'))
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GETINPUTS}`+localStorage.getItem('userID'))
        const data = response.data;
        console.log(data)
        var l = data.map((val)=>{ 
            
            return {input:val,value:''}});
        
        setFormlist([...l]);      
      }
      const handleChange = (prop) => (event) => {

        var newarr=[]

        formlist.map(obj => {
            if (obj.input === formlist[prop].input) {
                newarr.push({input:obj.input,value:event.target.value}); 
            }
            else{
                newarr.push({input:obj.input,value:obj.value});
            }
      
          });
          console.log([...newarr]);
          setFormlist([...newarr]);
          console.log(formlist)
      };
    return (  <div className={styles.container}>
        <Container maxWidth='sm' >
        <Card variant="outlined">
          <CardContent>
            <Typography variant='h5' align='center'>Getting started with Linguaphile</Typography>
            <Stack direction={'column'} justifyContent='center' spacing={7} marginTop={3}>
          
    {
    formlist.map((val,i)=>{

        
        return <TextField
        id="outlined-name"
        label={`${val.input}`}
        onChange={handleChange(i)}
      />
    })}
            <Button variant="contained" onClick={()=>{
                console.log(formlist);
            }}>Submit</Button>
            </Stack>
  
          </CardContent>
        </Card>
        </Container>
  
      </div>);
}