'use client';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

export function CardTitleClient({ size }) {
  const { openModal } = useModal()

  const onClickButton = () => {
    openModal(MODAL_TYPES.SELL_PHOTO_CARD, {
      title: "나의 포토카드 판매하기",
      subTitle: "마이갤러리",
      modal: "sell"
    })
  }

  return (
    <>
      <CardTitle
        onClick={() => onClickButton()}
        titleMessage="마켓 플레이스"
        buttonMessage="나의 포토카드 판매하기"
        className="w-full mx-auto md:text-[3.875rem] sm:text-[3rem]"
        buttonSize={size ? 'S' : ''}
      />
    </>
  )
}
