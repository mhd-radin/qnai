const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: you do not need to import @tensorflow/tfjs here, but make sure you have installed the peer dependencies for tfjs-core and tfjs-converter.

const qna = require('@tensorflow-models/qna');

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, "/localStore/index.html"));
// })


(async function() {
  // Load the model.
  const model = await qna.load();
  console.log('Bot is ready')

  app.post('/qna', function(req, res) {
    model.findAnswers(req.body.qes, req.body.passage).then(function(answer) {
      res.send(answer)
    })
  })

})()

app.listen((process.env.PORT || 3000));