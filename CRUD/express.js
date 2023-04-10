const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/patients', async (req, res, next) => {
  const { name, phone, complaints } = req.body;
  try {
    const id = await createPatient(name, phone, complaints);
    res.json({ id });
  } catch (e) {
    next(e);
  }
});

app.get('/patients/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await getPatient(id);
    if (patient) {
      res.json(patient);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

app.put('/patients/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, complaints } = req.body;
  try {
    const result = await updatePatient(id, name, phone, complaints);
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

app.delete('/patients/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deletePatient(id);
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});