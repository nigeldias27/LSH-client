import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//<a href="localhost:3000/mypdf.pdf" download></a>

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
  FormGroup,
  Checkbox,
  Alert
} from "@mui/material";
import axios from "axios";
export default function Form() {
  useEffect(() => {
    fetchinputs();
  }, []);

  const [formlist, setFormlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState(0);
  const router = useRouter();
  const [gotorole, setGotorole] = useState("");
  const [previousSubmisson,setPreviousSubmission] = useState([]);

  async function fetchinputs() {
    setOpen(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getinputs",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    console.log(response)
    setOpen(false);
    const data = response.data;
    if(data=="No form"){
      return
    }
    for (
      let questionsindex = 0;
      questionsindex < data.questions.length;
      questionsindex++
    ) {
      const element = data.questions[questionsindex];
      for (
        let innerquestionsindex = 0;
        innerquestionsindex < element.length;
        innerquestionsindex++
      ) {
        const e = element[innerquestionsindex];
        if (
          data.questions[questionsindex][innerquestionsindex].type == "checkbox"
        ) {
          var l = [];
          for (
            let il = 0;
            il <
            data.questions[questionsindex][innerquestionsindex].subheadings
              .length;
            il++
          ) {
            l.push(false);
          }
          data.questions[questionsindex][innerquestionsindex].val =
            JSON.stringify(l);
        } else {
          data.questions[questionsindex][innerquestionsindex].val = "";
        }
      }
    }
    console.log(data.questions);
    setFormlist([...data.questions]);
    setGotorole(data.goTorole);
    if(data.previousSubmisson!=undefined){setPreviousSubmission(data.previousSubmisson)}
  }

  const checkboxChange = (i, myi) => (event) => {
    const optioncheck = JSON.parse(formlist[ind][i].val);
    optioncheck[myi] = event.target.checked;
    formlist[ind][i].val = JSON.stringify(optioncheck);
    setFormlist([...formlist]);
  };

  const handleChange = (prop) => (event) => {
    formlist[ind][prop].val = event.target.value;
    setFormlist([...formlist]);
    console.log(formlist);
  };

  const submit = async () => {
    console.log(gotorole);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "submission",
      { questions: formlist, gotorole: gotorole ,previousSubmisson:previousSubmisson},
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    router.push('/form')
  };

  console.log("DONE");

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
                  } else if (val.type == "checkbox") {
                    return (
                      <FormControl>
                        <FormLabel>{val.input}</FormLabel>
                        <FormGroup>
                          {val.subheadings.map((myele, myi) => {
                            return (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={myele}
                                onChange={checkboxChange(i, myi)}
                              />
                            );
                          })}
                        </FormGroup>
                      </FormControl>
                    );
                  }
                })
              ) : (
                <Alert severity="info">No form available right now. Check back in later!</Alert>
              )}
              {ind + 1 != formlist.length ? (
                formlist.length==0?<Button
                disabled
                variant="contained"
                onClick={() => {
                  setInd(ind + 1);
                }}
              >
                Next
              </Button>:<Button
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
                    pdfmake();
                    submit();
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
