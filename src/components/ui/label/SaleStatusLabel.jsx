export default function SaleStatusLabel({ status }) {
  const saleStatus = {
    // AVAILABLE: { text: '판매 중', color: 'text-white' },
    TRADING: { text: '교환 제시 대기 중', color: 'text-main' },
    //SOLD_OUT : sold out 아이콘 처리
    ON_SALE: { text: '판매 중', color: 'text-white' }
  };

  const cardStatus = saleStatus[status];
  if (!cardStatus) {
    return null;
  }

  return (
    <div
      className="
        bg-black/50 w-max inline-flex items-center gap-[10px] rounded-[2px] font-normal
        sm:px-[8px] sm:py-[4px] sm:text-[10px]
        md:px-[8px] md:py-[4px] md:text-[14px]
        lg:px-[10px] lg:py-[4px] lg:text-[16px]"
    >
      <p className={`${cardStatus.color}`}>{cardStatus.text}</p>
    </div>
  );
}
