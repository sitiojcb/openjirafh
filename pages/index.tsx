import type { NextPage } from "next";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

//import styles from "../styles/Home.module.css";

const HomePage: NextPage = () => {
  //console.log(process.env);
  // console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);
  return (
    <>
      <Layout title="Home Open Jira">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader
                title="Pendientes"
                sx={{ backgroundColor: "#d94e18" }}
              />
              <CardContent>
                <NewEntry />

                <EntryList status="pending" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader
                title="En Progreso"
                sx={{ backgroundColor: "#525189" }}
              />
              <CardContent>
                <EntryList status="in-progress" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader
                title="Finalizadas"
                sx={{ backgroundColor: "#0000FF" }}
              />
              <CardContent>
                <EntryList status="finished" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomePage;
