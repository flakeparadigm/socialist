import express from 'express';
import cors from 'cors';
import apollo from './apollo';

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
apollo.server.applyMiddleware({ app });

// Routes
app.get('/', (req, res) => {
  res.send('SociaList');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`SociaList listening on port ${PORT}.`);
});
