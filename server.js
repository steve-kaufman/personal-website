// Things for managing the file system
const path = require('path');
const fs = require('fs');

// Starting Server's
// Page Routing
const express = require('express');
const app = express();

// Trust https proxys in production
if(app.get('env') === 'production'){
  app.set('trust proxy', 1)
}

// All the middleware
const mini = require('mini-image-server');
// const session = require('express-session');

// mini-image-server
app.use(mini(path.join(__dirname, 'static', 'img', 'min')));
// body-parser
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json({limit: '500mb'}));
// express-session
//app.use(session({
//  secret: fs.readFileSync(path.join(__dirname, 'auth.json'), 'utf-8'),
//  resave: false,
//  saveUninitialized: true,
//  cookie: {
//    maxAge: 60000,
//    secure: 'auto',
//  },
//}));

// Static routes for files
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'react-ui', 'build')));

// Start the server
const http = require('http');
const ports = {
  http: process.env.PORT || 3002,
}
const httpServer = http.createServer(app);
httpServer.listen(ports.http, () => {
  console.log(`http server started on port ${ports.http}`);
});

// Send the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-ui', 'build', 'index.html'));
});

// API routes for authentication
app.get('/auth/login', (req, res) => {
  res.json('false');
});
app.get('/auth/create', (req, res) => {
  res.json('false');
});

// API routes for the home page
app.get('/home/projects', (req, res) => {
  fs.readFile(path.join(__dirname, 'static', 'home', 'projects.json'), 'utf-8', (err, json) => {
    if(err){ return res.sendStatus(500) };
    res.send(json)
  });
});
app.get('/home/skills', (req, res) => {
  fs.readFile(path.join(__dirname, 'static', 'home', 'skills.json'), 'utf-8', (err, json) => {
    if(err){ return res.sendStatus(500) };
    res.send(json)
  });
});

// API routes for blog things
app.get('/blog/post', (req, res) => {
  fs.readFile(path.join(__dirname, 'static', 'blog', 'posts', `${req.query.post}.json`), 'utf-8', (err, json) => {
    if(err){ return res.sendStatus(500) };
    res.send(json)
  });
});
app.get('/blog/list', (req, res) => {
  // Get a list of all of the posts
  fs.readFile(path.join(__dirname, 'static', 'blog', 'index.json'), (err, json) => {
    if(err){ return res.sendStatus(500) };

    let files = JSON.parse(json);

    // Get the arguments on the request
    let count = req.query.count || -1;
    let start = req.query.start || -1;

    // Turn the object into an array of posts before the target time
    let posts = (start !== -1)? Object.keys(files) : Object.keys(files).filter((key) => {
      return files[key] > start;
    });
    // If we have a count limit then limit the count of the sorted array
    if(count !== -1){
      posts = posts.sort((a, b) => {
        return files[a] > files[b];
      }).splice(0, count);
    }

    res.json(posts.map((post) => {
      return { post, time: files[post] };
    }));
  });
});

// TODO: log ip addresses
app.post('/contact', (req, res) => {
  fs.writeFile(path.join(__dirname, 'data', 'contact', `${Date.now().toString()}.json`), JSON.stringify(req.body), 'utf-8', (err) => {
    if(err){
      return console.log(err);
    }
  })
});

// redirect any request that don't go anywhere to the home page
app.get('*', (req, res) => {
  res.redirect('/');
});
