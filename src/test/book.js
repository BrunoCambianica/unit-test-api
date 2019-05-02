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
        //expect(res.body.books.length).to.equal(0);
        done();
      });
  });
});

/**
 * Premier test unitaire
 */

describe('/GET book', () => {
  it('it should GET all the books', done => {

    nock(localhost)
    .get('/book')
    .reply(200,{
        books: [
            {
            id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9', title: 'Coco raconte Channel 2',
            years: 1990,
            pages: 400
            } ]
    });

      chai
      .request(localhost)
      .get('/book')
      .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(200);
          expect(res.body.books).to.be.an('array');
          //expect(res.body.books.length).to.equal(0);
          done();
      });
  });
});