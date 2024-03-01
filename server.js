const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const skillRoutes = require('./routes/skill');
const jwt = require('jsonwebtoken');  
const pdfGen = require('./pdf-generator');
const { Readable } = require('stream');
require('dotenv').config();
const app = express();
const User = require('./models/User');
const axios = require('axios');


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const githubAuthURL = process.env.AUTHURL;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const oauth = process.env.OAUTH;
const jwtSecret = process.env.JWT_SECRET;
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/user', userRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);

app.get('/', (req, res) => {
  res.redirect('/docs')
})

app.get("/oauth/callback", (req, res) => {
  const {code, state} = req.query;
  const decoded = jwt.verify(state, jwtSecret);
  
  if (decoded) {
    axios.post(`${oauth}`, {
      client_id: `${clientID}`,
      client_secret: `${clientSecret}`,
      code: `${code}`,
    }, {
      headers: {
        Accept: "application/json"
      }
    }).then((result) => {
      console.log(result)
      res.json({"token": result.data.access_token});
    }).catch((err) => {
      console.log(err);
    });
  }
});

app.get("/oauth", (req, res) => {
  const state = jwt.sign({}, jwtSecret);
  const authURL = `${githubAuthURL}?client_id=${clientID}&state=${state}`;
  res.redirect(authURL);
})

app.get('/generate-cv/:userId', async (req, res) => {
  const {userId} = req.params;
  const stream =  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="user-cv.pdf"',
  });
  pdfGen.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    userId
  )
});

app.listen(port, host, () => {
  console.log(`The server is running on ${host}:${port}`)
})

module.exports = app; 
