/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();
    dbConnection.query('SET FOREIGN_KEY_CHECKS=0', done);
    dbConnection.query('truncate users', done);
    dbConnection.query('truncate rooms', done);
    dbConnection.query('truncate messages', done);
    dbConnection.query('SET FOREIGN_KEY_CHECKS=1', done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  const username = 'Valjean';
  const message = 'In mercy\'s name, three days is all I need.';
  const roomname = 'Hello';
  const username2 = 'Jess';
  const message2 = 'Jess approves.';
  const roomname2 = 'JMAP';

  it('Should insert a single posted messages to the DB', (done) => {

    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }

          expect(results.length).toEqual(1);
          expect(results[0].body).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });

  });
  it('Should insert a second posted messages to the DB', (done) => {

    axios.post(`${API_URL}/users`, { usename: username2 })
      .then(() => {
        return axios.post(`${API_URL}/messages`, { username, message: message2, roomname: roomname2 });
      })
      .then(() => {
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }

          expect(results.length).toEqual(2);
          expect(results[1].body).toEqual(message2);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });


  it('Should output all messages from the DB', (done) => {

    const queryString = 'INSERT INTO messages VALUES (DEFAULT, "very first messgae", DEFAULT, "1")';
    const queryArgs = [];

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].body).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
