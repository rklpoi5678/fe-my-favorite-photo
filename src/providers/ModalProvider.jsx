"use client"
import { createContext, useCallback, useContext, useState } from "react";

import { CardModal } from "@/components/ui/modal/CardModal";
import Modal from "@/components/ui/modal/Modal";
import { SellPhotoCardModal } from "@/components/ui/modal/SellPhotoCardModal";
import TradeOfferModal from "@/components/ui/modal/TradeOfferModal"

const ModalContext = createContext();

// 어떤 모달을 열지 구분
export const MODAL_TYPES = {
  MODAL: 'Modal',
  CARD_MODAL: 'CardModal',
  SELL_PHOTO_CARD: 'SellPhotoCardModal',
  TRADE_OFFER_MODAL: 'TradeOfferModal'
}

// 모달의 유형 (어떤 모달이 켜질지 결정)
// 모달 추가 가능
const MODAL_COMPONENTS = {
  [MODAL_TYPES.MODAL]: Modal,
  [MODAL_TYPES.CARD_MODAL]: CardModal,
  [MODAL_TYPES.SELL_PHOTO_CARD]: SellPhotoCardModal,
  [MODAL_TYPES.TRADE_OFFER_MODAL]: TradeOfferModal
}

export function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null)
  const [modalProps, setModalProps] = useState({});

  const openModal = useCallback((type, props = {}) => {
    setModalType(type);
    setModalProps(props)
  }, [])

  const closeModal = useCallback(() => {
    setModalType(null)
    setModalProps({})
  }, [])

  const CurrentModal = modalType ? MODAL_COMPONENTS[modalType] : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, MODAL_TYPES }}>
      {children}
      {CurrentModal && (
        <CurrentModal {...modalProps} onClose={closeModal} isOpen={!!modalType} />
      )}
    </ModalContext.Provider>
  )
}
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal은 반드시 프로바이더 안에서 사용해야합니다.")
  }
  return context
}