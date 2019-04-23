import axios from 'axios';

const API_URL = 'http://tim.uardev.com/trial-project/api';

export const requestTags = () =>
  axios.get(`${API_URL}/tags`);