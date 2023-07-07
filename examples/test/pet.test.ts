import { test, describe, expect } from 'vitest';
import axios, { AxiosError, AxiosResponse } from 'axios';

// TODO: use SDK that we generate as well
describe('pet', () => {
  test('create pet with invalid param', async () => {
    try {
      await axios.post(
        'http://localhost:3000/pet',
        {},
        {
          headers: {
            helloworld: 'helloworld'
          }
        }
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        expect(err.response?.status).toBe(400);
      }
    }
  });

  test('create pet with correct param', async () => {
    let response: AxiosResponse | undefined;
    try {
      response = await axios.post(
        'http://localhost:3000/pet',
        {
          name: 'torgal',
          photoUrls: []
        },
        {
          headers: {
            helloworld: 'helloworld'
          }
        }
      );
    } catch (err) {
      // No-op.
      if (err instanceof AxiosError) {
        console.info(err.response?.data);
      }
    }

    expect(response).toBeDefined();
    expect(response?.status).toBe(200);
  });
});
