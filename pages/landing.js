import styles from "../styles/Home.module.css";
import Card from "@mui/material/Card";
import Link from "next/link";
import { CardContent, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import DoneIcon from '@mui/icons-material/Done';
import { Input } from "@mui/material"
import { Height } from "@mui/icons-material"
import "@fontsource/questrial"; // Defaults to weight 400.
import { orange } from '@mui/material/colors';

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";


function FormText(props){

    let today = new Date().toISOString().slice(0, 10);

    if(props.status==="pending"){
      return(<div style={{marginLeft: "2%", marginBottom: "1%"}}>
      <Box sx={{display: 'flex', flexDirection: 'row', background: '#ffedd0', borderRadius: "10px", padding: "2%", border: "5px solid #D9BB9B"}}>
        <Box sx={{display: 'flex', alignItems: 'center', marginRight: '3%'}}><ArticleIcon sx={{fontSize: '84px'}}/></Box>
        <Box sx={{display: 'flex', flexDirection: 'column', width: "300px"}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%'}}>
            <Box sx={{fontSize: "32px", fontWeight: '900'}}>#</Box>
            <Box sx={{fontSize: "32px", fontWeight: '900', overflowX: 'hidden'}}>{props.label}</Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Box sx={{fontSize: '18px', marginRight: "1%", fontWeight: '700'}}>created: </Box>
            <Box sx={{fontSize: '18px'}}>{today}</Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <ErrorOutlineIcon sx={{color:'red', marginRight: "1%"}}/>
            <Box sx={{fontSize: '16px', color:'red', fontWeight: '700'}}>pending</Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', marginTop: "7%", marginBottom: "2%"}}>
            <Box>
              <Button variant="raised" sx={{background: "#D9BB9B", fontSize: "16px", fontWeight: "700"}}>Complete Now!</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>)
  }

  if(props.status==="complete"){
    return(<div style={{marginLeft: "2%", marginBottom: "1%"}}>
    <Box sx={{display: 'flex', flexDirection: 'row', background: '#ffedd0', borderRadius: "10px", padding: "2%", border: "5px solid #D9BB9B"}}>
      <Box sx={{display: 'flex', alignItems: 'center', marginRight: '3%'}}><ArticleIcon sx={{fontSize: '84px'}}/></Box>
      <Box sx={{display: 'flex', flexDirection: 'column', width: "300px"}}>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%'}}>
          <Box sx={{fontSize: "32px", fontWeight: '900'}}>#</Box>
          <Box sx={{fontSize: "32px", fontWeight: '900', overflowX: 'hidden'}}>{props.label}</Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Box sx={{fontSize: '18px', marginRight: "1%", fontWeight: '700'}}>created: </Box>
          <Box sx={{fontSize: '18px'}}>{today}</Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <DoneIcon sx={{color:'green', marginRight: "1%"}}/>
          <Box sx={{fontSize: '16px', color:'green', fontWeight: '700'}}>complete</Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: "7%", marginBottom: "2%"}}>
          <Box>
            <Button variant="raised" sx={{background: "#D9BB9B", fontSize: "16px", fontWeight: "700"}}>Complete Now!</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  </div>)
}
}

function CreateForm(){
  return(<div style={{width: "150%", marginLeft: '30%'}}>
    <Box sx={{width: '0%', height: '0%', borderLeft: '25px solid transparent', borderRight: '25px solid transparent', borderBottom: '25px solid #ffedd0', marginLeft: "5%"}}></Box>
    <Box sx={{background: "#ffedd0", display: 'flex', flexDirection: 'column', padding: "3%", justifyContent: 'center', alignItems: 'center', borderRadius: "10px"}}>
      <Box sx={{fontSize: "22px", fontWeight: "700", marginBottom: "1%"}}>Form Name: </Box>
      <TextField sx={{width: '100%', marginBottom: "2%"}} label="Form Name"></TextField>
      <Button variant="raised" sx={{background: "#D9BB9B", fontSize: "16px", fontWeight: "700", width: '100%'}}>Create!</Button>
    </Box>
  </div>)
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const navbarStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: '#ffedd0 ',
    borderRadius: '10px'
  };
  const pageStyle = {
    background: '#FFFFF0',
    margin: "0px",
    // backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/005/145/984/original/office-and-school-stationery-seamless-background-pattern-free-free-vector.jpg")',
    fontFamily: 'Questrial',
    // width: '100%',
    // height: '100%'
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div style={pageStyle}>
      <div className="navbar" style={navbarStyle}>
        <Box sx={{height: "5%", width: "10%", marginRight: "25%", marginLeft: "1%"}} component="img" src="https://static.wixstatic.com/media/509b3c_1a2e37a045e749ab90cb338b3451a951~mv2.png/v1/crop/x_345,y_259,w_2720,h_1747/fill/w_558,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Linguaphile%20Logo%20%26%20font.png"></Box>
        <Box sx={{marginRight: "35%"}}>
        <TextField sx={{width: "150%"}}
          label="Search Linguaphile!"
          InputProps={{
            endAdornment: (<SearchIcon/>)
          }}
        />
        </Box>
        <Box sx={{marginRight: "2%"}}><NotificationsIcon style={{fontSize: "38px"}}/></Box>
        <Box component="img" sx={{height: "5%", width: "5%", borderRadius: "50%"}} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"></Box>
      </div>

      <Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: "5%", marginLeft: "5%"}}>
          <Box style={{fontSize: "128px", marginRight: "35%"}}>Hello, there!</Box>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <IconButton> {/* REFERENCE ON ICON BUTTONS: https://muhimasri.com/blogs/how-to-create-mui-icon-button-with-text/ */}
                <AddIcon style={{fontSize: "72px", padding: "20px", background: '#ffe5b4', borderRadius: "50%"}} />
              </IconButton>
              <CreateForm />
          </Box>{/* plus button */}

      </Box>

        <Box sx={{display: "flex", marginLeft: "3%", marginTop: "3%"}}>
          <Box sx={{width: "100%"}}>
            <Tabs value={value} onChange={handleChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: orange[500] }, '& .MuiTab-root': { color: orange[500] }, '& .Mui-selected': { color: orange[500] }, }} aria-label="basic tabs example">
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Finished" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0} sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <FormText label="yooooo" status="pending"/>
                <FormText label="john doe" status="pending"/>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1} sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <FormText label="pranav" status="complete"/>
                <FormText label="nigel" status="complete"/>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
