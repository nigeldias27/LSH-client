import styles from "../styles/Home.module.css";
import Card from "@mui/material/Card";
import Link from "next/link";
import { CardContent, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
export default function Home() {
  return (
    <div className={styles.container}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center">
              Getting started with Linguaphile
            </Typography>
            <Stack
              direction={"row"}
              justifyContent="center"
              spacing={7}
              marginTop={3}
            >
              <Link href="/login">
                <Button
                  variant="raised"
                  sx={{
                    background: "#D9BB9B",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outlined"
                  sx={{
                    color: "#D9BB9B",
                    borderColor: "#D9BB9B",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
