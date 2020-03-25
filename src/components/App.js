import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ReactDOM from 'react-dom';
import { endpoint } from '../endpoint';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import { Start, Join } from './session';
import { Room } from './Room';

const App = () => {

  return (
    <>
      <Header />
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/start-session">Start Session</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/join">
            <Join/>
          </Route>
          <Route path="/start-session">
            <Start/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/room/:roomId" component={Room} />
          <Route path="/">
            <Home />
          </Route>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    </>
  );
};

const Stats = () => {
  const [response, setResponse] = useState(0);
  const [usersOnline, setUsersOnline] = useState(0);
  const [roomsOnline, setRoomsOnline] = useState(0);

  useEffect(() => {
    let socket = socketIOClient(endpoint);
    socket.on('api', data => setResponse(data));
    socket.on('users-online', data => setUsersOnline(data.users));
    socket.on('rooms-online', data => setRoomsOnline(data.rooms));
  }, []);

  return response ? (
    <div className="stats">
      <p>Server Online</p>
      <p>{usersOnline} users online</p>
      <p>{roomsOnline} rooms online</p>
    </div>
  ) : (<div className="stats"><p>Server Offline</p></div>);
};

const NoMatch = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
    </div>
  );
};

const Header = () => {
  return (
      <>
      <h1>Pointer</h1>
      <div className="subheader">Pointing tool</div>
      </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <p><Link to="/join">Join a session</Link> or <Link to="/start-session">Start Session</Link></p>
      <Stats />
    </>
  );
}

const About = () => {
  return (
    <>
    <h2>About</h2>
      <p>This is a pointing tool, for story planning</p>
      <p>Created by Patrick Simpson</p>
      <p><a href="https://github.com/patricksimpson/pointer">https://github.com/patricksimpson/pointer</a></p>
    </>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

export default App;
