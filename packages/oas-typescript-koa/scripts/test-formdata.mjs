import axios from 'axios';
import image from './test-image.jpg';

// TODO: use https://www.npmjs.com/package/form-data.
async function main() {
  try {
    const formData = new FormData();
    formData.set('profileImage', image);

    const response = await axios('/pet/123/uploadImage', {
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.info(response);
  } catch (err) {
    console.error(err);
  }
}

main();
