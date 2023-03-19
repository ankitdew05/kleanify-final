const express = require('express');
const path = require('path');
const app = express();
app.use(require('prerender-node').set('prerenderToken', '7Chn38gADzpMesoT5Or7'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000,()=>{
  console.log('Running on Port 5000')
});

// const express = require('express');
// const path = require('path');
// const app = express();
// const ReactDOMServer = require('react-dom/server');
// const  Helmet = require('react-helmet');
// const App = require('./src/App');

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   const appString = ReactDOMServer.renderToString(<App />);
//   const helmet = Helmet.renderStatic();
//   const html = `<!DOCTYPE html>
//     <html lang="en">
//       <head>
//         ${helmet.title.toString()}
//         ${helmet.meta.toString()}
//       </head>
//       <body>
//         <div id="root">${ appString }</div>
//       </body>
//     </html>
//   `
//   res.send(html);
// });

// app.listen(5000,()=>{
//   console.log('Running on Port 5000')
// });
