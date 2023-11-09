import { test, describe, expect } from 'vitest';
import axios, { AxiosError } from 'axios';

describe('pet', () => {
  const currentDate = new Date().valueOf();
  const petName = `torgal-${currentDate}`;

  test('create pet with invalid auth', async () => {
    let error: unknown;

    try {
      await axios(`http://localhost:3000/pet`, {
        method: 'post',
        data: { name: '', photoUrls: [] }
      });
    } catch (err) {
      error = err;
    }

    expect(error instanceof AxiosError).toBe(true);

    if (error instanceof AxiosError) {
      expect(error.response?.status).toBe(401);
    }
  });

  test('create pet with invalid param', async () => {
    let error: unknown;

    try {
      await axios(`http://localhost:3000/pet`, {
        method: 'post',
        data: {},
        headers: {
          api_key: 'helloworld'
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error instanceof AxiosError).toBe(true);

    if (error instanceof AxiosError) {
      expect(error.response?.status).toBe(400);
    }
  });

  test('create pet with correct param', async () => {
    let response: any;
    try {
      response = await axios(`http://localhost:3000/pet`, {
        method: 'post',
        data: {
          name: petName,
          photoUrls: []
        },
        headers: {
          api_key: 'helloworld'
        }
      });
    } catch (err) {
      // No-op.
    }

    expect(response).toBeDefined();
    expect(response.data.name).toBe(petName);
  });

  test('create pet with the same param', async () => {
    let response: any;
    let error: unknown;

    try {
      response = await axios(`http://localhost:3000/pet`, {
        method: 'post',
        data: {
          name: petName,
          photoUrls: []
        },
        headers: {
          api_key: 'helloworld'
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error instanceof AxiosError).toBe(true);
    expect(response).toBeUndefined();

    if (error instanceof AxiosError) {
      expect(error.response).toBeDefined();
      expect(error.response?.status).toBe(405);
    }
  });
});
