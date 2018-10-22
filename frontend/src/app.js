/**
 * In this file the Express application is created. All of the frontend routes
 * are defined in this file:
 *   - /assets: All static assets, including the bundled scripts and styles,
 *              are made available from here.
 *   - /      : The index route serves the web application itself.
 *
 * Note that '/api' also exists, but that route is handled by NGINX and
 * redirects to the backend application.
 */

const path = require('path');
const express = require('express');
const Youch = require('youch');
const combinedReducers = require('./reducers');
const api = require('./helpers/api');
const createStore = require('./helpers/createStore');

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const Root = React.createFactory(require('./components/Root'));

const _ = require('lodash');
const moment = require('moment');
// Create a new Express app
const app = express();

// Serve up our static assets from 'dist/'
app.use('/assets', express.static(path.join(__dirname, '..', 'dist')));

// Serve up font-awesome fonts from vendor folder
app.use('/assets/font-awesome/fonts', express.static(
  path.dirname(require.resolve('font-awesome/fonts/FontAwesome.otf'))));

// Set up the index route
app.get('/', (req, res,next) => {
  // this is flow by lab8 - Load data from Api
  // two reduces- one for blog post and pme for initialState to equal combinedReducer
  //main html
  api.get('/notebooks').then((notebooks) =>{
    // get data from API
    const initialState = combinedReducers();
    initialState.notebooks.data=notebooks;

    // change code to use universal javascript
    const initialStateString=JSON.stringify(initialState).replace(/<\//g,"<\\/");
    // create the redux store
    const store = createStore(initialState);
    // create the root react component
    const rootComponent= Root({store});
    // the root component to html string
    const reactHtml = ReactDOMServer.renderToString(rootComponent);

  const htmlDocument = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Neverwrote</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/app.css">
        <script src="/assets/js/vendor.js"></script>
        <script src="/assets/js/app.js"></script>
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script>window.main(${initialStateString});</script>
      </body>
    </html>`;

  // Respond with the complete HTML page
  res.send(htmlDocument);
}).catch(next);
});

// Catch-all for handling errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  if(res.headersSent) {
    return next(err);
  }
  const youch = new Youch(err, req);
  youch.toHTML().then(html => res.send(html));
});

module.exports = app;
