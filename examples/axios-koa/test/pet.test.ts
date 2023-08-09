import { test, describe, expect } from 'vitest';
import { AxiosError } from 'axios';
import { PetApi } from '../src/client';

// TODO: use SDK that we generate as well
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

    console.info(error);
    expect(error instanceof AxiosError).toBe(true);

    if (error instanceof AxiosError) {
      expect(error.response?.status).toBe(401);
    }
  });

  // test('create pet with invalid param', async () => {
  //   try {
  //     await api.addPet(
  //       // @ts-expect-error
  //       { body: {} },
  //       {
  //         headers: {
  //           helloworld: 'helloworld'
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     if (err instanceof AxiosError) {
  //       expect(err.response?.status).toBe(400);
  //     }
  //   }
  // });

  // test('create pet with correct param', async () => {
  //   let response: AxiosResponse | undefined;
  //   try {
  //     response = await api.addPet(
  //       {
  //         body: {
  //           name: 'torgal',
  //           photoUrls: []
  //         }
  //       },
  //       {
  //         headers: {
  //           helloworld: 'helloworld'
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     // No-op.
  //   }

  //   expect(response).toBeDefined();
  //   expect(response?.status).toBe(200);
  // });

  // test('create pet with the same param', async () => {
  //   let response: AxiosResponse | undefined;
  //   try {
  //     response = await axios.post(
  //       'http://localhost:3000/pet',
  //       {
  //         name: 'torgal',
  //         photoUrls: []
  //       },
  //       {
  //         headers: {
  //           helloworld: 'helloworld'
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     // No-op.
  //     if (err instanceof AxiosError) {
  //       response = err.response;
  //     }
  //   }

  //   expect(response).toBeDefined();
  //   expect(response?.status).toBe(405);
  // });
});
