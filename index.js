import express from "express";

const PORT = 1230;
const server = express();

//-------------Middleware---------------
function logger(req, res, next) {
  console.log(`Got request: method = ${req.method}, url = ${req.url}`);
  next();
}

function nameLogger(req, res, next) {
  console.log(`Received name: ${req.params.name}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use('/greet/:name', nameLogger);

//-------------Routes---------------
server.get('/greet', (req, res) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-IL');
  res.send({ msg: `hi from get endpoint <${formattedDate}>` });
});

server.get('/greet/:name', (req, res) => {
  res.send({ msg: `got name <${req.params.name}>` });
});

server.get('/test', (req, res) => {
  fetch('http://localhost:1230/greet/nahman')
    .then(response => response.json())
    .then(data => {
      if (data.msg === "got name <nahman>") {
        res.send({ result: "Ok" });
      } else {
        res.send({ result: "fail" });
      }
    })
});

server.post('/action', (req, res) => {
  if (req.body.action === "joke") {
    return fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(data => {
        res.send({ joke: `${data.setup}, ${data.punchline}` });
      })
  }

  if (req.body.action === "cat fact") {
    return fetch('https://api.thecatapi.com/v1/images/search?limit=11', {
      headers: {
        'x-api-key': 'live_y0bksNuJKqVDR10nV7GtiSEU1NsNJZ9295O6LohxjDcCbOifR8N6zlvLzJ1kxlY9'
      }
    })
    .then(response => response.json())
    .then(data => {
      res.send({ length: `${data.length}` });
    })
    .catch(err => {
      res.status(500).send({ error: "Failed to fetch cat facts", details: err.message });
    });
  }
    res.status(400).send({ error: "Bad request" });
});


//-------------Start server---------------
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
