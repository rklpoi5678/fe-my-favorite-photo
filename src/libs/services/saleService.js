import { tokenFetch } from '../utils/fetchClient';

export const saleService = {
  createSale: (saleData) => {
    return tokenFetch('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },

  closeSale: (saleId) => {
    return tokenFetch(`/sales/${saleId}/close`, {
      method: 'POST',
    });
  },

  updateSale: (saleId, saleData) => {
    return tokenFetch(`/sales/${saleId}/update`, {
      method: 'PATCH',
      body: JSON.stringify(saleData),
    });
  },
};
