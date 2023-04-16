import {
  CircularProgress,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { FC, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import CategoryForm from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageUsersForm from "./pages/ManageUsers";
import MyProjects from "./pages/MyProjects";
import Notfound from "./pages/NotFound";
import ProjectForm from "./pages/Project";
import ProjectScrum from "./pages/ProjectScrum";
import TaskForm from "./pages/Task";
import { signOut, useLoggedInUser } from "./utils/firebase";
import { Switch as SwitchButton } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    variant: "outlined",
    color: "primary",
  },
  switch: {
    color: "primary",
    marginLeft: "auto",
    marginRight: -12,
  },
  link: { textDecoration: "none" },
}));

const App: FC = () => {
  /**
   * Darkmode
   */
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const handleDarkMode = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  // MUI theme override
  const ourTheme = createMuiTheme({
    palette: {
      primary: {
        main: darkMode ? "#424242" : "#98CACA",
        dark: darkMode ? "#3b5998" : "#3b5998",
        contrastText: darkMode ? "#ffffff" : "#000000",
      },
      secondary: {
        main: "#f7b668",
      },
      background: {
        default: darkMode ? "#303030" : "#E4EBF3",
        paper: darkMode ? "#424242" : "#ffffff",
      },
      type: darkMode ? "dark" : "light",
    },
  });

  const classes = useStyles();
  const user = useLoggedInUser();

  return (
    <MuiThemeProvider theme={ourTheme}>
      <CssBaseline />
      <Router>
        <AppBar color="primary" position="sticky" variant="outlined">
          {/* Navigation rendered on all pages */}
          <Toolbar>
            <Link className={classes.link} to="/">
              <Button className={classes.menuButton}>Home</Button>
            </Link>
            {user === null && (
              <Link className={classes.link} to="/login">
                <Button className={classes.menuButton}>Login</Button>
              </Link>
            )}
            {user && (
              <>
                <Link className={classes.link} to="/my-projects">
                  <Button className={classes.menuButton}>My Projects</Button>
                </Link>
                <Button className={classes.menuButton} onClick={signOut}>
                  Logout
                </Button>
              </>
            )}
            <FormControlLabel
              className={classes.switch}
              control={
                <SwitchButton
                  checked={darkMode}
                  onChange={handleDarkMode}
                  name="darkMode"
                />
              }
              label="Dark Mode"
            />
          </Toolbar>
        </AppBar>

        {user === null && <Redirect to="/login" />}

        <main className="App">
          <Container maxWidth="lg">
            {/* Wait for user session */}
            {user === undefined ? (
              <CircularProgress />
            ) : (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/my-projects"
                  exact
                  component={user ? MyProjects : Login}
                />
                <Route
                  path="/project"
                  exact
                  component={user ? ProjectForm : Login}
                />
                <Route
                  path="/category"
                  exact
                  component={user ? CategoryForm : Login}
                />
                <Route path="/task" exact component={user ? TaskForm : Login} />
                <Route
                  path="/manage-users"
                  exact
                  component={user ? ManageUsersForm : Login}
                />
                <Route
                  path="/project-scrum"
                  exact
                  component={user ? ProjectScrum : Login}
                />
                <Route component={Notfound} />
              </Switch>
            )}
          </Container>
        </main>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
