const express = require('express');
const Datastore = require('nedb');

const app = express();
let db = new Datastore({ filename: 'scoresheets.db', autoload: true });

const port = 80;
// You can issue commands right away

function createNewScoresheet(res) {
  var scoresheet = {};

  db.insert(scoresheet, (err, newScoresheet) => {
    // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    res.json({ id: newScoresheet._id });
  });
}

app.use(express.static('./app'));

app.get('/api/scoresheet/:id', (req, res) => {
  // Validate the the scoresheet ID. If it's valid return the same ID.
  if (req.params.id) {
    db.find({ _id: req.params.id }, (err, docs) => {
      if (docs.length === 0) {
        // If the ID isn't valid, create a new scoresheet and return that ID.
        createNewScoresheet(res);
      } else {
        res.json({ id: docs[0]._id });
      }
    });
  }
});

// If you don't supply an ID then a new scoresheet will be created and the ID returned.
app.post('/api/scoresheet', (req, res) => createNewScoresheet(res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
