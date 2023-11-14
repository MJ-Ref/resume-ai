
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import UploadResume from './components/UploadResume';
import UploadJob from './components/UploadJob';
import AIInterview from './components/AIInterview';
import GenerateResume from './components/GenerateResume';
import ViewJobs from './components/ViewJobs';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Auth setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Auth setUser={setUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard user={user} />
        </Route>
        <Route path="/upload-resume">
          <UploadResume user={user} />
        </Route>
        <Route path="/upload-job">
          <UploadJob user={user} />
        </Route>
        <Route path="/ai-interview">
          <AIInterview user={user} />
        </Route>
        <Route path="/generate-resume">
          <GenerateResume user={user} />
        </Route>
        <Route path="/view-jobs">
          <ViewJobs user={user} />
        </Route>
        <Route path="/">
          <Auth setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

