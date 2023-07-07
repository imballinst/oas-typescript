import { test, describe, expect } from 'vitest';
import axios from 'axios';

// TODO: use SDK that we generate as well
describe('pet', () => {
  test('create pet with invalid param', async () => {
    let response = await axios.post('http://localhost:3000/pet', {});
    expect(response.status).toBe(400);
  });

  test('create pet with correct param', async () => {
    let response = await axios.post('http://localhost:3000/pet', {
      name: 'torgal',
      photoUrls: []
    });
    expect(response.status).toBe(200);
    expect(response.data).toBe({
      id: expect.any(Number),
      name: 'torgal',
      photoUrls: []
    });
  });
});
