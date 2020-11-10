import axios from 'axios';
import sizeOf from 'buffer-image-size';

async function getImageDimensions(url) {
  let result = null;

  try {
    result = await axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const buffer = Buffer.from(response.data, 'binary');

        const dimensions = sizeOf(buffer);
        return {
          dimensions: dimensions || { width: 0, height: 0 },
          url,
        };
      });
  } catch {
    result = {
      dimensions: { width: 0, height: 0 },
      url: '/images/catalogo-share.jpg',
    };
  }

  return result;
}

export default getImageDimensions;
