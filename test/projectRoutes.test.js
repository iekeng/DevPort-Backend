const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');
const expect = chai.expect;
chai.use(chaiHttp);

describe('project API', () => {
    before(async () => {
      user = new User({ 
        name: 'Jeane Macron',
        email: 'jeane@email.com',
        phone: 1239,
      })
      await user.save();
    });

    it('should create a new project for user with user._id', (done) => {
      chai.request(server)
        .post(`/project/${user._id}`)
        .send({ name: 'alx-backend_user_data',
                repoURL: 'http://github.com/john_d_doe/alx-backend_user_data',
                liveURL: 'http://github.io/alx-backend_user_data',
                description: 'This repo consists of javascript and python language backend frameowrks',
                user: `${user._id}`,
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({ 
            "name": 'alx-backend_user_data',
            "repoURL": 'http://github.com/john_d_doe/alx-backend_user_data',
            "liveURL": 'http://github.io/alx-backend_user_data',
            "description": 'This repo consists of javascript and python language backend frameowrks',
            "user": `${user._id}`,
        });
          expect(res.body.user).to.be.eq(`${user._id}`)

        createdProjectId = res.body._id;
          done();
      });
    });

    it('should get all project records by user._id', (done) => {
        chai.request(server)
         .get(`/project/${user._id}/${createdProjectId}`)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all project records by user._id', (done) => {
      chai.request(server)
       .get(`/project/${user._id}`)
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
});
