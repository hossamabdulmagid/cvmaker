import React, { Fragment } from "react";
import Nav from "./components/nav/nav.component";
import Head from "./components/header/header.component";
import Bottom from "./components/bottom/bottom.component";
import Footer from "./components/footer/footer.component";
import { Switch, Route, Redirect } from "react-router-dom";
import SigninSignup from "./pages/signin-signup/signin-signup.component";
import Privacy from "./pages/privacy/privacy.component";
import Contact from "./pages/contact/contact.component";
import Help from "./pages/help/help.component";
import Tips from "./pages/tips/tip.component";
import Lang from "./pages/lang/lang.component";
import CreateCv from "./pages/create-cv/createcv.component";
import ScrollToTop from "./lib/scrolToTop";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import setCurrentUser from "./redux/user/user.action";
import { connect } from "react-redux";
import PublicOnlyRoute from "./lib/publicOnlyRoute";
import PrivateRoute from "./lib/privateRoute";
import OldCv from "./pages/old-cv/old-cv.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";

class App extends React.Component {
  unsubscribeFormAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFormAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFormAuth();
  }
  //this line for commit ..

  render() {
    const { currentUser } = this.props;

    return (
      <Fragment>
        <ScrollToTop />

        <div className="Container">
          <Nav />
          <Switch>
            <Route path="/" exact component={Head} />
            <Route
              path="/login"
              exact
              render={() =>
                currentUser ? <Redirect to="/cv" /> : <SigninSignup />
              }
            />
            <PrivateRoute exact path="/login" component={SigninSignup} />
            <Route path="/policy" component={Privacy} />
            <Route path="/contact" component={Contact} />
            <Route path="/Help" component={Help} />
            <Route path="/tips" component={Tips} />
            <Route path="/lang" component={Lang} />
            <Route
              path="/create-cv/:id"
              render={() =>
                currentUser ? <Redirect to="/cv" /> : <SigninSignup />
              }
              component={CreateCv}
            />
            {/*
            <PublicOnlyRoute exact path="/create-cv" redirectPath="/" component={CreateCv} /> */}
            <PrivateRoute
              exact
              path="/cv"
              render={() =>
                currentUser ? <Redirect to="/cv" /> : <SigninSignup />
              }
              component={OldCv}
            />
          </Switch>
          <Bottom />
          <Footer />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
