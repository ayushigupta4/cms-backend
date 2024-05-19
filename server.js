const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const cors = require('cors');
const { DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.post('/create-entity', async (req, res) => {
  const { entityName, attributes } = req.body;

  const modelAttributes = {};
  attributes.forEach(attr => {
    if (attr.type === 'STRING') {
      modelAttributes[attr.name] = { type: DataTypes.STRING };
    } else if (attr.type === 'NUMBER') {
      modelAttributes[attr.name] = { type: DataTypes.NUMBER};
    } else if (attr.type === 'DATE') {
      modelAttributes[attr.name] = { type: DataTypes.DATEONLY };
    }
  });

  const Entity = db.define(entityName, modelAttributes, {
    freezeTableName: true,
  });

  await Entity.sync();
  res.send({ success: true, message: `Entity ${entityName} created.` });
});

app.post('/entity/:name', async (req, res) => {
  const { name } = req.params;
  const Entity = db.models[name];
  if (Entity) {
    const entry = await Entity.create(req.body);
    res.send(entry);
  } else {
    res.status(404).send({ error: 'Entity not found' });
  }
});

app.get('/entity/:name', async (req, res) => {
  const { name } = req.params;
  const Entity = db.models[name];
  if (Entity) {
    const entries = await Entity.findAll();
    res.send(entries);
  } else {
    res.status(404).send({ error: 'Entity not found' });
  }
});

app.put('/entity/:name/:id', async (req, res) => {
  const { name, id } = req.params;
  const Entity = db.models[name];
  if (Entity) {
    await Entity.update(req.body, { where: { id } });
    res.send({ success: true });
  } else {
    res.status(404).send({ error: 'Entity not found' });
  }
});

app.delete('/entity/:name/:id', async (req, res) => {
  const { name, id } = req.params;
  const Entity = db.models[name];
  if (Entity) {
    await Entity.destroy({ where: { id } });
    res.send({ success: true });
  } else {
    res.status(404).send({ error: 'Entity not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
