import { tokenFetch } from '../utils/fetchClient';

export const tradeService = {
  /**
   * 구매자가 판매글에 교환을 요청 (제시) 합니다.
   * @params {object} saleData - 판매글 ID, 제시 카드 ID  등
   */
  requestSale: (saleData) => {
    return tokenFetch('/trades', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },

  /**
   *  [구매자] 자신이 신청한 교환 요청을 취소합니다.
   * @param {string} tradeId
   */
  applicantCancel: (tradeId) => {
    return tokenFetch(`/trades/${tradeId}/cancel`, {
      method: 'POST',
    });
  },

  /**
   * [판매자] 들어온 교환 요청을 거절합니다.
   * 이는 교환 상태를 PENDING에서 REJECTED로 변경합니다.
   * @param {string} tradeId
   */
  ownerReject: (tradeId) => {
    return tokenFetch(`/trades/${tradeId}/reject`, {
      method: 'POST',
    });
  },

  /**
   *  [판매자] 들어온 교환 요청을 승인하고 거래를 완료합니다.
   * 이는 교환 상태를 ACCEPTED로 변경 서로 포토카드 소유권을 변경
   * @param {string} tradeId   *
   */
  ownerApprove: (tradeId) => {
    return tokenFetch(`/trades/${tradeId}/approve`, {
      method: 'POST',
    });
  },
};
