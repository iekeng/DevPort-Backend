  const chai = require('chai');
  const chaiHttp = require('chai-http');
  const server = require('../server');
  const User = require('../models/User');
  const expect = chai.expect;
  chai.use(chaiHttp);

  describe('project API', () => {
      before(async () => {
        user = new User({ 
          name: 'Milan Dorsey',
          email: 'milan@email.com',
          phone: 1247,
        })
        await user.save();
      });

      it('should create a new project for user with user._id', (done) => {
        chai.request(server)
          .post(`/skill/${user._id}`)
          .send({ skills: ['Python', 'Javascript'],
                  user: `${user._id}`,
                }).end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.deep.include({ 
              "skills": ['Python', 'Javascript'],
              "user": `${user._id}`,
          });
            expect(res.body.user).to.be.eq(`${user._id}`)

          createdProjectId = res.body._id;
            done();
        });
      });

      // it('should get all project records by user._id', (done) => {
      //     chai.request(server)
      //      .get(`/project/${user._id}/${createdProjectId}`)
      //      .end((err, res) => {
      //         expect(res).to.have.status(200);
      //         expect(res.body).to.be.an('array');
      //         done();
      //       });
      //   });

      it('should get all project records by user._id', (done) => {
        chai.request(server)
        .get(`/skill/${user._id}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            done();
          });
      });
  });
