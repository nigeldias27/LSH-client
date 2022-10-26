import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  Alert,
  AppBar,
  Toolbar,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Navb } from "../../component/navbar";
export default function Form() {
  const [formlist, setFormlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState(0);
  const router = useRouter();
  const [gotorole, setGotorole] = useState([]);
  const [previousSubmisson, setPreviousSubmission] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    console.log("Effect");
    console.log(toggle);
    fetchinputs();
  }, [toggle]);

  async function fetchinputs() {
    setOpen(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}` + "getinputs",
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    setOpen(false);
    const data = response.data;
    console.log(data);
    if (data == "No form") {
      setFormlist([]);
      return;
    }
    if (data == "Verification error") {
      localStorage.removeItem("userID");
      router.push("/login");
      return;
    }

    console.log(data);
    setFormlist([...data.questions]);
    setGotorole([...data.goTorole]);
    if (data.previousSubmisson != undefined) {
      setPreviousSubmission(data.previousSubmisson);
    }
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
    const { submissionId } = router.query;
    console.log(gotorole);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "submission/" + submissionId,
      {
        questions: formlist,
        goTorole: gotorole,
        previousSubmisson: previousSubmisson,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("userID")}` } }
    );
    setToggle(toggle == true ? false : true);
    console.log(toggle);
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/002/735/447/non_2x/school-supplies-and-office-stationary-on-white-background-back-to-school-education-and-business-concept-seamless-pattern-for-banner-poster-office-supply-store-and-wallpaper-free-vector.jpg")',
      }}
    >
      <Navb />
      <Container
        maxWidth="sm"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
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
                        value={val.val}
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
                <Alert severity="info">
                  No form available right now. Check back in later!
                </Alert>
              )}
              {ind + 1 != formlist.length ? (
                formlist.length == 0 ? (
                  <Button
                    disabled
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
                      setInd(ind + 1);
                    }}
                  >
                    Next
                  </Button>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="raised"
                    sx={{
                      background: "#D9BB9B",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    onClick={() => {
                      submit();
                    }}
                  >
                    Submit
                  </Button>
                </div>
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