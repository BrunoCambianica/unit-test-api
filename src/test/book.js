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
let id;
let bookMocked = {
  "title":"Coco raconte Channel 4",
  "years":2010,
  "pages":600
};

/**
 * 1er test Intégration
 */
describe('/GET book', () => {
  it('should GET all the books', done => {
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
      
/*
 * 2ème test Intégration
 */
describe('/POST book', () => {
  it('should POST a book', done => {
    chai
      .request(localhost)
      .post('/book')
      .send(bookMocked)
      .end((err, res) => {
        id = res.body.book._id;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully added');
        done();
      });
  });
});

/**
 * 3ème test Intégration
 */
describe('/PUT book', () => {
  it('should PUT a book', done => {
    chai
      .request(localhost)
      .put(`/book/${id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully updated');
        done();
      });
  });
});

/**
 * 4ème test Intégration
 */
describe('/GET book', () => {
  it('should GET a book', done => {
    chai
      .request(localhost)
      .get(`/book/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book fetched');
        expect(res.body.book).to.be.an('object');
        expect(res.body.book.title).to.be.a('string');
        expect(res.body.book.title).to.equal(bookMocked.title);
        expect(res.body.book.years).to.satisfy(Number.isInteger);
        expect(res.body.book.years).to.equal(bookMocked.years);
        expect(res.body.book.pages).to.satisfy(Number.isInteger);
        expect(res.body.book.pages).to.equal(bookMocked.pages);
        done();
      });
  });
});

/**
 * 5ème test Intégration
 */
describe('/DELETE book', () => {
  it('should DELETE a book', done => {
    chai
      .request(localhost)
      .delete(`/book/${id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully deleted');
        done();
      });
  });
});

/**
  * Premier test unitaire
  */
describe('/GET book', () => {
  it('it should GET all the books 2 ', done => {
    nock(localhost)
    .get('/book')
    .reply(200,{ books: [] });
    chai
      .request(localhost)
      .get('/book')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.books).to.be.an('array');
        done();
      });
  });
});

/**
 * Deuxième test unitaire
 */
describe('/POST book', () => {
  it('should POST a book 2', done => {
    nock(localhost)
    .post('/book')
    .reply(200, {
      book: {
        _id: id,
        ...bookMocked
      },
      message: 'book successfully added'
    });
    chai
      .request(localhost)
      .post('/book')
      .send(bookMocked)
      .end((err, res) => {
        id = res.body.book._id;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully added');
        done();
      });
  });
});

/**
  * Troisième test unitaire
  */
 describe('/PUT book', () => {
  it('should PUT a book', done => {
    nock(localhost)
    .put(`/book/${id}`)
      .reply(200, { message: 'book successfully updated' });
    chai
      .request(localhost)
      .put(`/book/${id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully updated');
        done();
      });
  });
});

/**
 * Quatirème test unitaire
 */
describe('/DELETE book', () => {
it('it should DELETE book', done => {
    nock(localhost)
    .delete(`/book/${id}`)
    .reply(200,{ message: 'book successfully deleted' });
    chai
      .request(localhost)
      .delete(`/book/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('book successfully deleted');
        done();
      });
  });
});

/**
 * Sixième test unitaire
 */
describe('/GET book', () => {
  it('it should DELETE book', done => {
      nock(localhost)
      .get(`/book/${id}`)
      .reply(400,{ message: 'error fetching books' });
      chai
        .request(localhost)
        .get(`/book/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('error fetching books');
          done();
        });
    });
});

/**
 * Septième test unitaire
 */
describe('/POST book', () => {
  it('it should POST book', done => {
      nock(localhost)
      .post(`/book/${id}`)
      .reply(400,{ message: 'error adding the book' });
      chai
        .request(localhost)
        .post(`/book/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('error adding the book');
          done();
        });
    });
});

/**
 * Huitième test unitaire
 */
describe('/PUT book', () => {
  it('it should PUT book', done => {
      nock(localhost)
      .put(`/book/${id}`)
      .reply(400,{ message: 'error updating the book' });
      chai
        .request(localhost)
        .put(`/book/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('error updating the book');
          done();
        });
    });
});

/**
 * Neuvième test unitaire
 */
describe('/DELETE book', () => {
  it('it should DELETE book', done => {
      nock(localhost)
      .delete(`/book/${id}`)
      .reply(400,{ message: 'error deleting the book' });
      chai
        .request(localhost)
        .delete(`/book/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('error deleting the book');
          done();
        });
    });
});