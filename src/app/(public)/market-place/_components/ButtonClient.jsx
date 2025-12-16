"use client"

import { Button } from '@/components/ui/button/Button';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';


export function ButtonClient() {
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
      <Button size="S" onClick={() => onClickButton()} className="justify-center-safe w-[345px] h-[55px] md:hidden lg:hidden">
        나의 포토카드 판매하기
      </Button>
    </>
  )
}