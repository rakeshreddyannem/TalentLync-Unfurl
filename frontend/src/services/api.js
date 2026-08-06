import axios from 'axios';

const API_BASE = '/api/candidates';

export const unfurlProfileUrl = async (targetUrl) => {
  const response = await axios.get(`${API_BASE}/unfurl`, {
    params: { url: targetUrl },
  });
  return response.data;
};

export const fetchCandidates = async (params = {}) => {
  const response = await axios.get(API_BASE, { params });
  return response.data;
};

export const saveCandidate = async (candidateData) => {
  const response = await axios.post(API_BASE, candidateData);
  return response.data;
};

export const toggleCandidateShortlist = async (id) => {
  const response = await axios.patch(`${API_BASE}/${id}/shortlist`);
  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};
