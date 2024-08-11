import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import './App.css'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobsDetails from './components/JobsDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobsDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App


