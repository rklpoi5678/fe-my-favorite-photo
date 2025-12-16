import { tokenFetch } from '../utils/fetchClient';

export const saleService = {
  createSale: (saleData) => {
    return tokenFetch('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },
};
