import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App';
import {RemSet} from "./util/rem";
import './index.css';
import "tailwindcss/tailwind.css";

ReactDOM.render(
  <Router>
    <RemSet />
    <Switch>
      <Route path="/" component={App}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

