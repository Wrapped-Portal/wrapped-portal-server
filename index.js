/** @format */

require('dotenv').config();
const app = require('express')();

const PORT = process.env.PORT || 3001;

const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

app.use(cors());
app.use(express.json());

app.all('/', (req, res) => {
  res.status(200).send({ Proof: 'Proof Of Life' });
});

app.use(authRoutes);
app.use(spotifyRoutes);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
