const request = require('supertest');
const express = require('express');
const toolsRoutes = require('../routes/tools');

const app = express();
app.use(express.json());
app.use('/api/tools', toolsRoutes);

describe('Tools API', () => {
  describe('POST /api/tools/password-strength', () => {
    it('should reject empty password', async () => {
      const res = await request(app)
        .post('/api/tools/password-strength')
        .send({ password: '' });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
    });

    it('should analyze a weak password', async () => {
      const res = await request(app)
        .post('/api/tools/password-strength')
        .send({ password: '123' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.strength.strength).toBe('weak');
    });

    it('should analyze a strong password', async () => {
      const res = await request(app)
        .post('/api/tools/password-strength')
        .send({ password: 'Tr0ub4dor&ExtraLong!' });

      expect(res.status).toBe(200);
      expect(res.body.data.strength.strength).toMatch(/good|strong/);
      expect(Array.isArray(res.body.data.recommendations)).toBe(true);
    });
  });
});
