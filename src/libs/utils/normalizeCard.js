// market 정규화
export const normalizeMarketCard = (card) => {
  const { seller, userCard, ...saleFields } = card;

  return {
    // sale 테이블
    sale: {
      id: saleFields.id,
      status: saleFields.status,
      price: saleFields.price,
      quantity: saleFields.quantity,
      remainingQuantity: saleFields.remainingQuantity,
      description: saleFields.description,
      createdAt: saleFields.createdAt,
      updatedAt: saleFields.updatedAt,
      genre: saleFields.genre,
      grade: saleFields.grade,
    },

    // PhotoCard 테이블
    ...userCard.photoCard,
    photoCardTotalQuantity: userCard.photoCard.totalQuantity,

    // sale.id(렌더링)
    id: saleFields.id,

    photoCardId: userCard.photoCardId,

    // userCard 테이블
    userCardId: userCard.id,
    userCardStatus: userCard.status,
    userCardTotalQuantity: userCard.totalQuantity,
    price: saleFields.price,
    totalQuantity: saleFields.quantity,

    nickname: seller?.nickname ?? null,
  };
};

// gallery & selling 정규화
export const normalizeUserCard = (card) => {
  return {
    ...card.photoCard,
    id: card.id,
    status: card.status,
    originalQuantity: card.photoCard.totalQuantity, // 원본 총량
    totalQuantity: card.totalQuantity, // 보유 중 수량
    price: card.price,
    photoCardId: card.photoCardId,
    nickname: card.user?.nickname ?? null,
  };
};
