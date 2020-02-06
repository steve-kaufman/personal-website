// Things for managing the file system
const path = require('path');
const fs = require('fs');

// Starting Server's
// Page Routing
const express = require('express');
const app = express();

// All the middleware
const mini = require('mini-image-server');
const bodyParser = require("body-parser");
const session = require('express-session');

// mini-image-server
app.use(mini(path.join(__dirname, 'static', 'img', 'min')));
// body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({limit: '500mb'}));
// express-session
app.use(session({
  secret: fs.readFileSync(path.join(__dirname, 'auth.json')),
  cookie: {
    maxAge: 60000
  }
}));

// Static routes for files
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'react-ui', 'build')));

// Start the server
const http = require('http');
const ports = {
  http: process.env.PORT || 3002
}
const httpServer = http.createServer(app);
httpServer.listen(ports.http, () => {
  console.log(`http server started on port ${ports.http}`);
});

// Send the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-ui', 'build', 'index.html'));
});

app.get('auth/login', (req, res) => {
  res.json('false');
});

app.get('auth/create', (req, res) => {
  res.json('false');
});

app.get('/projects', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf-8', (err, json) => {
    if(err){
      return console.log(err);
    }
    res.send(json);
  });
});

app.get('/skills', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'skills.json'), 'utf-8', (err, json) => {
    if(err){
      return console.log(err);
    }
    res.send(json);
  });
});

app.get('/blog/post', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'blog', 'posts', `${req.query.post}.json`), 'utf-8', (err, json) => {
    if(err){
      return console.log(err);
    }

    res.send(json);
  });
});

app.get('/blog/postList', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'blog', 'index.json'), 'utf-8', (err, json) => {
    if(err){
      return console.log(err);
    }

    let index = JSON.parse(json);

    Promise.all(index.map((post) => {
      return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, 'data', 'blog', 'posts', `${post.id}.json`), 'utf-8', (err, json) => {
          if(err){
            return reject(err);
          }
          resolve(JSON.parse(json));
        })
      });
    }))
    .then((posts) => {
      res.json(posts.map((post, i) => {
        return {
          description: post.description,
          id: index[i].id,
        };
      }));
    })
    .catch((err) => {
      if(err){
        return console.log(err);
      }
    });
  });
});

app.get('/blog/new', (req, res) => {
  let count = req.query.count || 3;
  fs.readFile(path.join(__dirname, 'data', 'blog', 'index.json'), 'utf-8', (err, json) => {
    if(err){
      return console.log(err);
    }

    let posts = JSON.parse(json);
    let start = req.query.start || posts.length;
    count = (count > start)? start : count;

    Promise.all(posts
    .slice(start - count, count)
    .map((post) => {
      return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, 'data', 'blog', 'posts', `${post.id}.json`), 'utf-8', (err, json) => {
          if(err){
            return reject(err);
          }
          resolve(JSON.parse(json));
        })
      });
    }))
    .then((posts) => {
      res.json({
        end: start - count,
        posts
      });
    })
  });
});

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
