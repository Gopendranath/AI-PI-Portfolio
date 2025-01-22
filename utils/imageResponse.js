const axios = require('axios');
require('dotenv').config();


const createImage = async (prompt) => {
    const options = {
        method: 'POST',
        url: 'https://api.starryai.com/creations/',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-Key': String(process.env.X_API_KEY),
        },
        data: {
            model: 'lyra',
            aspectRatio: 'square',
            highResolution: false,
            images: 1,
            steps: 20,
            initialImageMode: 'color',
            prompt: prompt,
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.id);
        return response.data;
    } catch (error) {
        console.error('Error creating image:', error.response?.data || error.message);
        throw new Error('Failed to create image');
    }
};

const getImage = async (creationId) => {
    const options = {
      method: 'GET',
      url: `https://api.starryai.com/creations/${creationId}`,
      headers: {
        accept: 'application/json',
        'X-API-Key': String(process.env.X_API_KEY),
      },
      timeout: 30000, // 30 second timeout
    };
  
    const fetchImage = async () => {
      try {
        const response = await axios.request(options);
        if (response && response.data && response.data.status === 'completed') {
          return response.data.images[0];
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return fetchImage(); // recursive call
        }
      } catch (error) {
        console.error('Error fetching image:', error.response?.data || error.message);
        throw new Error(`Failed to fetch image: ${error.message}`);
      }
    };
  
    return fetchImage();
  };

module.exports = { createImage, getImage };