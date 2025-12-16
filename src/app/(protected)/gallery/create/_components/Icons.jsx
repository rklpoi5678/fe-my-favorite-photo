import Image from "next/image"

import MobileBackIcon from "@/assets/icons/Ic_back.svg"
import DownArrow from "@/assets/icons/Ic_downArrow.svg"
import UpArrow from "@/assets/icons/Ic_upArrow.svg"

export function BackIcon() {
  return (
    <Image
      src={MobileBackIcon}
      alt="뒤로가기 버튼"
      width={22}
      height={22}
    />
  )
}


export function ArrowIcon({ isOpen }) {
  return (
    <>
      {isOpen ? (
        <Image
          src={UpArrow}
          alt="드롭다운 열기"
        />
      ) : (
        <Image
          src={DownArrow}
          alt="드롭다운 닫기"
        />
      )}
    </>
  )
}