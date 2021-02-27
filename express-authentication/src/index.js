const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [
  {
    email: 'pepito@gmail.com',
    password: '1234asd',
    username: 'pepe el user',
    id: 1,
  },
  {
    email: 'juanito@gmail.com',
    password: '1234asd',
    username: 'juan el user',
    id: 2,
  },
  {
    email: 'maria@gmail.com',
    password: '1234asd',
    username: 'maria la user',
    id: 3,
  },
];

// Simulamos que tenemos un req.user como hace passport...
let user = null;

// Metemos el router aquí porque es un server mock
const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ data: 'Server alive!' }));

router.post('/auth/login', (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = users.find((user) => {
    return user.password === password && user.email === email;
  });

  // En passport sería => req.logIn()
  if (foundUser) {
    user = foundUser;
  }

  res.status(200).json({ data: foundUser });
});

router.get('/auth/profile', (req, res, next) => {
  // En passport devolveríamos => req.user
  setTimeout(() => {
    res.status(200).json({ data: user });
  }, 1000);
});

router.get('/auth/logout', (req, res, next) => {
  user = null;
  // En passport sería => req.logOut();

  res.status(200).json({ data: user });
});

app.use('/', router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
