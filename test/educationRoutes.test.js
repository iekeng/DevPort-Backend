const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User')
const expect = chai.expect;
chai.use(chaiHttp);

describe('education API', () => {
    before(async () => {
      user = new User({ 
        name: 'Jack Doe',
        email: 'jack@email.com',
        phone: 1237,
      })
      await user.save();
    });

    it('should create a new education for user with user id', (done) => {
      chai.request(server)
        .post(`/education/${user._id}`)
        .send({ institution: 'African Leadership University',
                course: 'Computer Science',
                degree: 'Bachelors',
                startDate: '120302',
                endDate: '120307',
                location: 'Nairobi',
                user: `${user._id}`
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({
            "institution": "African Leadership University",
            "course": "Computer Science",
            "degree": "Bachelors",
            "startDate": "120302",
            "endDate": "120307",
            "location": "Nairobi",});
          expect(res.body.user).to.be.eq(`${user._id}`)

        createdEducationId = res.body._id;
          done();
      });
    });

    it('should get all education records by userId', (done) => {
        chai.request(server)
         .get(`/education/${user._id}/${createdEducationId}`)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all education records by userId', (done) => {
      chai.request(server)
       .get(`/education/${user._id}`)
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
});
