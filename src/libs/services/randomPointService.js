import { tokenFetch } from '@/libs/utils/fetchClient';

//GET /points/random/eligibility
export const getRandomPointEligibility = async () => {
  return tokenFetch('/points/random/eligibility');
};

//POST /points/random
export const executeRandomPoint = async () => {
  return tokenFetch('/points/random', {
    method: 'POST',
  });
};
