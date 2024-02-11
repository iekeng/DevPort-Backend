const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');
const expect = chai.expect;
chai.use(chaiHttp);

describe('experience API', () => {
    before(async () => {
      user = new User({ 
        name: 'Jane Doe',
        email: 'jane@email.com',
        phone: 1236,
        socials: [{
          twitter: 'twitter.com/jane',
          linkedin: 'linkedin.com/jane'
      }]
      })
      await user.save();
      
    });

    it('should create a new experience for user with userId', (done) => {
      chai.request(server)
        .post(`/experience/${user._id}`)
        .send({ organisation: 'ALX',
                position: 'digital marketer',
                startDate: '120301',
                endDate: '120305',
                achievements: ['Increased number of X followers by 200%', 'chao ming'],
                responsibilities: ['Run office errands', 'Make memes'],
                user: `${user._id}`,
              }).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.deep.include({ 
          "organisation": 'ALX',
          "position": 'digital marketer',
          "startDate": '120301',
          "endDate": '120305',
          "achievements": ['Increased number of X followers by 200%', 'chao ming'],
          "responsibilities": ['Run office errands', 'Make memes'],
          "user": `${user._id}`,
        });
          expect(res.body.user).to.be.eq(`${user._id}`)

        createdExperienceId = res.body._id;
          done();
      });
    });

    it('should get all experience records by userId', (done) => {
        chai.request(server)
         .get(`/experience/${user._id}/${createdExperienceId}`)
         .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

    it('should get all experience records by userId', (done) => {
      chai.request(server)
       .get(`/experience/${user._id}`)
       .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });

});
