import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

const localhost = 'http://localhost:8080';

/**
 * Premier test Intégration
 */
describe('/GET book', () => {
  it('it should GET all the books', done => {
    chai
      .request(localhost)
      .get('/book')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.books).to.be.an('array');
        expect(res.body.books.length).to.equal(0);
        done();
      });
  });
});