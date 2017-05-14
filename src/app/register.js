/**
 * Created by fylder on 2017/5/14.
 */
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PhotoTitle from './Components/PhotoTitle'; // Our custom react component
import Register from './Components/Register'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<PhotoTitle />, document.getElementById('title'));
render(<Register />, document.getElementById('register'));
