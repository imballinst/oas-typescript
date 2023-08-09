import { test, describe, expect } from 'vitest';
import { AxiosError } from 'axios';
import { PetApi } from '../src/client';
import { Pet } from '../src/client/pet';

describe('pet', () => {
  const api = PetApi({
    defaultAxiosRequestConfig: { baseURL: 'http://localhost:3000' }
  });

  test('create pet with invalid auth', async () => {
    let error: unknown;

    try {
      await api.addPet({ body: { name: '', photoUrls: [] } });
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
      await api.addPet(
        // @ts-expect-error
        { body: {} },
        {
          headers: {
            helloworld: 'helloworld'
          }
        }
      );
    } catch (err) {
      error = err;
    }

    expect(error instanceof AxiosError).toBe(true);

    if (error instanceof AxiosError) {
      expect(error.response?.status).toBe(400);
    }
  });

  test('create pet with correct param', async () => {
    let response: Pet | undefined;
    try {
      response = await api.addPet(
        {
          body: {
            name: 'torgal',
            photoUrls: []
          }
        },
        {
          headers: {
            helloworld: 'helloworld'
          }
        }
      );
    } catch (err) {
      // No-op.
    }

    expect(response).toBeDefined();
    expect(response?.name).toBe('torgal');
  });

  test('create pet with the same param', async () => {
    let response: Pet | undefined;
    let error: unknown;

    try {
      response = await api.addPet(
        {
          body: {
            name: 'torgal',
            photoUrls: []
          }
        },
        {
          headers: {
            helloworld: 'helloworld'
          }
        }
      );
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
