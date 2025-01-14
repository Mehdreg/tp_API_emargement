const express = require('express');
const userRoutes = require('./routes/utilisateurs');
const sessionRoutes = require('./routes/sessions');
const emargementRoutes = require('./routes/emargements');
const app = express()
const port = 3000

app.use(express.json());
app.use('/auth', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/sessions', emargementRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})