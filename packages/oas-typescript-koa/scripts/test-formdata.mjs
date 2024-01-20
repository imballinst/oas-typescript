// @ts-check
import axios from 'axios';
import path from 'path';
import { FormData } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';

let response;
let error;

try {
  const form = new FormData();
  form.set(
    'profileImage',
    await fileFromPath(path.join(process.cwd(), 'scripts', 'test-image.jpg'))
  );

  response = await axios.post(`http://localhost:3000/pet/0/uploadImage`, form, {
    headers: {
      api_key: 'helloworld'
    }
  });
} catch (err) {
  error = err;
}

console.info(response);
console.info(error);
