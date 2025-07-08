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

server.get(`/test`, (req, res) => {
  fetch('http://localhost:1230/greet/nahman')
    .then(response => {
      if (response.msg === "got name <nahman>")
        res.send({ result: "Ok" });
      else
        res.send({ result: "fail" });
    });
});

//-------------Start server---------------
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
