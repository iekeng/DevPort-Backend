const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('user API', () => {
    it('should create a new user', (done) => {
      chai.request(server)
        .post('/users/')
        .send({ name: 'John Doe',
                email: 'john@email.com',
                phone: 1234
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({
                                    "name": "John Doe",
                                    "email": "john@email.com",
                                    "phone": 1234});
          done();
      });
    });

    it('should get all users', (done) => {
      chai.request(server)
       .get('/users/')
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
});
