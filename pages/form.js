import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
export default function Form() {
  useEffect(() => {
    fetchinputs();
  }, []);
  const [formlist, setFormlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState(0);
  const [gotorole, setGotorole] = useState("");
  async function fetchinputs() {
    setOpen(true);
    console.log(`${process.env.NEXT_PUBLIC_API}` + "getinputs");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getinputs",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    setOpen(false);
    const data = response.data;
    console.log(data);
    setFormlist([...data.questions]);
    setGotorole(formlist.goTorole);
  }
  const handleChange = (prop) => (event) => {
    var newar = [];
    for (let i = 0; i < formlist.length; i++) {
      if (i != ind) {
        newar.push(formlist[i]);
      } else {
        var newarr = [];
        formlist[ind].map((obj) => {
          if (obj.input === formlist[ind][prop].input) {
            newarr.push({
              input: obj.input,
              type: obj.type,
              subheadings: obj.subheadings,
              val: event.target.value,
            });
          } else {
            newarr.push({
              input: obj.input,
              type: obj.type,
              subheadings: obj.subheadings,
              val: obj.val,
            });
          }
        });
        newar.push(newarr);
      }
    }

    console.log([...newar]);
    setFormlist([...newar]);
    console.log(formlist);
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center">
              Getting started with Linguaphile
            </Typography>
            <Stack
              direction={"column"}
              justifyContent="center"
              spacing={7}
              marginTop={3}
            >
              {formlist.length != 0 ? (
                formlist[ind].map((val, i) => {
                  if (val.type == "text") {
                    return (
                      <TextField
                        id="outlined-name"
                        label={`${val.input}`}
                        onChange={handleChange(i)}
                      />
                    );
                  } else if (val.type == "radio") {
                    return (
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          {val.input}
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          {val.subheadings.map((myele) => {
                            return (
                              <FormControlLabel
                                value={myele}
                                control={<Radio />}
                                label={myele}
                                onChange={handleChange(i)}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    );
                  }
                })
              ) : (
                <br></br>
              )}
              {ind + 1 != formlist.length ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setInd(ind + 1);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(formlist);
                  }}
                >
                  Submit
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
