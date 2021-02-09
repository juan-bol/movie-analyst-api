process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let nock = require('nock');
const { expect } = require('chai');

chai.use(chaiHttp);

let mock = [
  {
    title: 'Deadpool',
    release: 2016,
    score: 11,
    reviewer: 'Robert Smith'
  }
];

//Our parent block
describe('API', () => {

  before(() => {
    server = require('../server');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  /*
  * Test the /GET route
  */
  describe('/GET home', () => {
      it('it should GET any reply', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
      });
  });


  /*
  * Test the /Simple test
  */
  describe('/Get movies', () => {
    it('returns the tittle of a movie', (done) => {
      nock('http://localhost:3000')
        .get('/movies')
        .reply(200, { mock });

      let result = chai.request(server).get('/movies');
      done();

      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal({ mock });
      expect(result.body[0].title).to.equal('Deadpool');
    });
  });

});
