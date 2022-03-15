import "./App.css";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => (
	<Switch>
		<Route exact path='/login' component={LoginForm} />
		<Route exact path='/signup' component={SignUpForm} />
		<ProtectedRoute exact path='/' component={Home} />
		<Route path='/not-found' component={NotFound} />
		<Redirect to='/not-found' />
	</Switch>
);

export default withRouter(App);
