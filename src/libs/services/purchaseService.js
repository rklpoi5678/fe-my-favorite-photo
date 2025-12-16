import { tokenFetch } from '@/libs/utils/fetchClient';

const purchaseService = {
  purchase: (saleId, quantity) => {
    if (!saleId) throw new Error('saleId가 없습니다.');

    return tokenFetch(`/purchases/${saleId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  },
};

export default purchaseService;
