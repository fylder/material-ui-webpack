/**
 * Created by fylder on 2017/5/14.
 */
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PhotoHead from './Components/PhotoHead'; // Our custom react component
import PhotoTools from './Components/PhotoTools'; // Our custom react component
import PhotoManage from './Components/PhotoManage'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<PhotoHead />, document.getElementById('head'));
render(<PhotoTools />, document.getElementById('tools'));
render(<PhotoManage />, document.getElementById('manage'));
