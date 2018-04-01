import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../routes';

import Box from '../components/Box';

export default () =>
  <Box width={227} display="column" margin="30px">
    <p>Everyone is waiting for something.<br/>
      Everyday we count years, weeks, days...</p>
    <p>Counting Counter will count it for you!</p>
    <p>Set up multiple counters, change their format or even end date!</p>
    <p>
      <Link className="link" to={routes.SIGN_UP}>Create an account</Link> today or
      <Link className="link" to={routes.LOG_IN}> log in</Link> if you are registered.</p>
  </Box>;
