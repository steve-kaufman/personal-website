// Things for managing the file system
const path = require('path');

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

// Set up mongodb
const mongodb = require('mongodb');
const mongo = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  db: process.env.DATABASE || 'website',
};
// Connect to mongodb server
mongodb.MongoClient.connect(mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((client) => {
  let db = client.db(mongo.db);

  // API routes for the home page
  app.get('/home/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
      if(err){ return res.sendStatus(500) };
      res.send(projects);
    });
  });
  app.get('/home/skills', (req, res) => {
    db.collection('skills').find({}).toArray((err, skills) => {
      if(err){ return res.sendStatus(500) };
      res.send(skills);
    });
  });

  // API routes for blog things
  app.get('/blog/post', (req, res) => {
    db.collection('posts').findOne({
      _id: new mongodb.ObjectId(req.query.post)
    }, (err, post) => {
      if(err){ return res.sendStatus(500) };
      res.send(post);
    });
  });
  app.get('/blog/list', (req, res) => {
    db.collection('posts').find({}).toArray((err, posts) => {
      // Get the arguments on the request
      let count = req.query.count || -1;
      let start = req.query.start || -1;

      if(start !== -1){
        posts = posts.filter((post) => {
          return post.date > start;
        });
      }
      if(count !== -1){
        posts = posts.sort((a, b) => {
          return a.date > b.date;
        }).splice(0, count);
      }

      res.json(posts.map((post) => {
        return {
          post: post._id,
          date: post.date,
        };
      }))
    });
  });

  // TODO: log ip addresses
  app.post('/contact', (req, res) => {
    db.collection('contact').insert({
      date: Date.now(),
      id: req.ip,
      ...req.body
    });
    req.send();
  });

  // redirect any request that don't go anywhere to the home page
  app.get('*', (req, res) => {
    res.redirect('/');
  });
})
.catch((err) => {
  throw err;
});
