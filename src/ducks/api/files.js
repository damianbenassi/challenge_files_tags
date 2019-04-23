import axios from 'axios';

const API_URL = 'http://tim.uardev.com/trial-project/api';

export const requestFiles = (page = 1, tag = []) =>
  axios.get(`${API_URL}/files`, { params: { page, tag } });

export const renameFile = (id, filename) =>
  axios.post(`${API_URL}/file/${id}/rename`, { filename });