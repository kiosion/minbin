import app from '../src/index';
import supertest from 'supertest';

describe('app', () => {
  let request;

  beforeEach(() => {
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
  });

  it('should return a message on GET /', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
  });
});
