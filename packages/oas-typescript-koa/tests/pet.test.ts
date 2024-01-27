import { test, describe, expect, afterAll } from 'vitest';
import axios, { AxiosError } from 'axios';
import { FormData } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';
import path from 'path';
import fs from 'fs/promises';

afterAll(async () => {
  const uploadDir = path.join(process.cwd(), 'tests/uploads');
  const uploadedFiles = await fs.readdir(uploadDir, { withFileTypes: true });
  const filesExceptGitIgnore = uploadedFiles.filter(
    (file) => file.name !== '.gitignore'
  );

  await Promise.all(
    filesExceptGitIgnore.map((file) => fs.rm(path.join(uploadDir, file.name)))
  );
});

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
          form.set(
            'profileImage',
            await imageToFile('./resources/docusaurus-social-card.jpg')
          );

          response = await axios.post(`${origin}/pet/0/uploadImage`, form, {
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

      test('upload pet image with less limits', async () => {
        let response: any;
        let error: unknown;

        try {
          const form = new FormData();
          const image = await imageToFile(
            './resources/docusaurus-social-card.jpg'
          );
          form.set('profileImage', image);
          form.append('profileImageArray', image);
          form.append('profileImageArray', image);

          response = await axios.post(
            `${origin}/pet/0/uploadImageWithSmallerLimit`,
            form,
            {
              headers: {
                api_key: 'helloworld'
              }
            }
          );
        } catch (err) {
          error = err;
        }

        assertAxiosError(error);

        expect(error.response?.data.code).toBe('10001');
        expect(error.response?.data.message).toBe('invalid body');
        expect(error.response?.data.detail[0].content).toStrictEqual({
          field: 'profileImage',
          type: 'MAX_SIZE_EXCEEDED'
        });
        expect(error.response?.data.detail[1].content).toStrictEqual({
          field: 'profileImageArray',
          type: 'MAX_FILES_EXCEEDED'
        });

        expect(response).not.toBeDefined();
      });

      test('upload pet multipart', async () => {
        let response: any;
        let error: unknown;

        try {
          const form = new FormData();
          form.set('profileImage', new Blob(['some content']));
          form.set('name', 'Oyen');

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
async function imageToFile(filePath: string) {
  // Read the image file as a Buffer
  return fileFromPath(path.join(process.cwd(), 'tests', filePath));
}

function assertAxiosError(val: unknown): asserts val is AxiosError<any> {
  if (!(val instanceof AxiosError)) {
    throw new Error('not an axios error');
  }
}
