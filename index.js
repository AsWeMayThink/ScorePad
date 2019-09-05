const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./app'));

app.get('/api/scoresheet/:id', (req, res) => {
  if (req.params.id === '92485') {
    res.json({ id: '92485' });
  } else {
    res.json({ id: '25235' });
  }
});

app.post('/api/scoresheet', (req, res) => res.json({ id: '02394' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
