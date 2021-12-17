import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import Add from "./screens/Add";
import Header from "./components/header/Header";
import Detail from "./screens/Detail";
import Profile from "./screens/Profile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? (
                  <>
                    <Header />
                    <Home />
                  </>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path="/sign-up">
                  <SignUp />
                </Route>
              ) : null}
              <Route path="/add" exact>
                {isLoggedIn ? (
                  <>
                    <Header />
                    <Add />
                  </>
                ) : (
                  <NotFound />
                )}
              </Route>
              {/* 디테일  보여줌 if me? => can Edit and Delete */}
              <Route path="/shop/:id" exact>
                {isLoggedIn ? (
                  <>
                    <Header />
                    <Detail />
                  </>
                ) : (
                  <NotFound />
                )}
              </Route>
              <Route path="/profile/:username" exact>
                {isLoggedIn ? (
                  <>
                    <Header />
                    <Profile />
                  </>
                ) : (
                  <NotFound />
                )}
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
