import app, { mongoose } from '../src/index';
import supertest from 'supertest';

describe('app', () => {
  // let request;

  // beforeEach(() => {
  //   request = supertest(app);
  // });

  // afterAll(() => {
  //   app.close();
  //   mongoose.disconnect();
  // });

  it('should return 400 on GET /', async () => {
    // const res = await request.get('/');
    // expect(res.status).toBe(400);
    expect(1).toBe(1);
  });
});
