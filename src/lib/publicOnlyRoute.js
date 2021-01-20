import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PublicOnlyRoute = ({
  redirectPath = "/",
  component: Component,
  currentUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !currentUser ? <Component {...props} /> : <Redirect to={redirectPath} />
    }
  />
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(PublicOnlyRoute);
