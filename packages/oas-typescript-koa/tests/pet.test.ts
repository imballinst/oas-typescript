import { test, describe, expect } from 'vitest';
import axios, { AxiosError } from 'axios';

import { readFile } from 'fs/promises';
import path from 'path';

describe('pet', () => {
  const currentDate = new Date().valueOf();
  const petName = `torgal-${currentDate}`;
  const origins = ['http://localhost:3000', 'http://localhost:3001'];

  for (const origin of origins) {
    describe(origin, () => {
      test('create pet with invalid auth', async () => {
        let error: unknown;

        try {
          await axios(`${origin}/pet`, {
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
          await axios(`${origin}/pet`, {
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
          response = await axios(`${origin}/pet`, {
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
          response = await axios(`${origin}/pet`, {
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

      test('upload pet image', async () => {
        let response: any;
        let error: unknown;

        try {
          const form = new FormData();
          form.append(
            'profileImage',
            await imageToBlob('./resources/docusaurus-social-card.jpg')
          );

          response = await axios(`${origin}/pet/0/uploadImage`, {
            method: 'post',
            data: form,
            headers: {
              api_key: 'helloworld'
            }
          });
        } catch (err) {
          error = err;
        }

        expect(error instanceof AxiosError).toBe(false);
        expect(response).toBeDefined();
      });

      test('upload pet multipart', async () => {
        let response: any;
        let error: unknown;

        try {
          const form = new FormData();
          form.append('profileImage', new Blob(['some content']));
          form.append('name', 'Oyen');

          response = await axios(`${origin}/pet/0/updatePetMultipart`, {
            method: 'post',
            data: form,
            headers: {
              api_key: 'helloworld'
            }
          });
        } catch (err) {
          error = err;
        }
        console.error(error);
        expect(error instanceof AxiosError).toBe(false);
        expect(response).toBeDefined();
      });

      test('delete pet', async () => {
        let response: any;
        let error: unknown;

        try {
          response = await axios(`${origin}/pet/0`, {
            method: 'delete',
            headers: {
              api_key: 'helloworld'
            }
          });
        } catch (err) {
          error = err;
        }

        expect(response.status).toBe(204);
        expect(response.data).toBe('');
      });
    });
  }
});

// Helper functions.
async function imageToBlob(filePath: string) {
  // Read the image file as a Buffer
  const imageBuffer = await readFile(
    path.join(process.cwd(), 'tests', filePath)
  );

  // Create a Blob-like object from the Buffer
  const blob = new Blob([imageBuffer], { type: 'image/jpg' }); // You may need to specify the correct MIME type for your image

  return blob;
}
