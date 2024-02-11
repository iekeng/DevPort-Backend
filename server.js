const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const skillRoutes = require('./routes/skill');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const app = express();


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const authURL = process.env.AUTHURL
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.SECRET 
const oauth = process.env.OAUTH 

mongoose.connect('mongodb://localhost/devport', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);
app.use(cors())

app.get('/', (req, res) => {
  res.redirect('/docs')
})

// app.get('/oauth', (req, res) => {
//   res.redirect(`${authURL}`);
// })

app.get("/callback/:code", (req, res) => {
  axios.post(`${oauth}`, {
      client_id: `${clientID}`,
      client_secret: `${clientSecret}`,
      code: req.params.code
  }, {
      headers: {
          Accept: "application/json"
      }
  }).then((result) => {
      res.json({"token": result.data.access_token});
  }).catch((err) => {
      console.log(err);
  });
});

app.get("/oauth", (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize?client_id=829a74c5da72aa7b820c&state=sugar')
})


app.get('/generate-cv/:userId', async(req, res) => {
  try{
    const userId = req.params.userId;
    const pdfBuffer = await generatePDF(userId);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="user-cv.pdf"');
    
    res.send(pdfBuffer);

  } catch(err) {
    console.log(err);
    res.status(500).send('CV generation failed')
  }
})

app.listen(port, host, () => {
  console.log(`The server is running on ${host}:${port}`)
})

module.exports = app;