import axios from 'axios';
export const fetchAboutData = (params) => {
  return new Promise((resolve, reject) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    axios
      .get(url)
      .then(response => {
        resolve({
          about: {
            posts: response.data
          }
        });
      })
      .catch((error) => {
        console.log('Error while fetching posts from network', error);
        reject(null);
      });
  });
}