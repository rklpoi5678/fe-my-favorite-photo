"use client"
import { cva } from "class-variance-authority"

import { cn } from "@/libs/utils/cn"

const buttonVariants = cva(
  'flex items-center justify-center rounded-[2px] transition-colors duration-200 ease-in-out',
  {
    variants: {
      intent: {
        primary: "bg-main hover:bg-main/80 active:bg-main/70 text-black",
        secondary: "bg-black text-white hover:bg-gray-500 active:bg-gray-500/50 border border-gray-100"
      },
      size: {
        L: "w-110 h-20 py-6.25 text-xl",
        M: "w-85.5 h-18.75 py-6.25 text-lg",
        S: "w-50 h-10 py-6.25 text-lg",
        XS: "w-37.5 h-10 px-4.25 text-[.75rem]"
      },
      thickness: {
        thick: '',
        thin: ''
      },
      state: {
        valid: "",
        inValid: "bg-gray-400 text-gray-300 hover:bg-gray-400/70 active:bg-gray-400/60 cursor-not-allowed"
      }
    },
    compoundVariants: [
      {
        size: 'L',
        thickness: 'thin',
        class: 'w-130 h-15 text-lg'
      },
      {
        size: 'M',
        thickness: 'thin',
        class: 'w-110 h-13.75 text-base'
      },
      {
        size: 'S',
        thickness: 'thin',
        class: 'w-86.25 h-13.75 text-base'
      },
      {
        size: 'XS',
        thickness: 'thin',
        class: 'w-37.5 h-10'
      }
    ],
    defaultVariants: {
      intent: "primary",
      size: "L",
      state: 'valid'
    }
  }
)

/**
 * 버튼 컴포넌트입니다. CVA를 사용하여 스타일 변형을 관리합니다.
 * @param {'primary' | 'secondary'} intent      버튼 배경색 (버튼 스타일 시안에 있는 main컬러와 secondary컬러)
 * @param {'L' | 'M' | 'S' | 'XS'} size         버튼 사이즈 (버튼 스타일 시안에 맞는 너비,높이,폰트 크기)
 * @param {'thick' | 'thin'} thickness          버튼 두께를 설정합니다. thin은 버튼 시안에 오른쪽입니다.
 * @param {boolean} [inValid]                   버튼이 유효하지 않은 상태인지 여부(true일경우 비활성화 스타일적용)
 * @param {ReactNode}  children                 버튼에 들어갈 메시지 (텍스트 아이콘 등)
 * @param {string}  [className]                 외부에서 추가할 Tailwind CSS 클래스 (선택사항 cn함수로 cva클래스를 덮어쓴다.)
 * @param {object} [...]                        HTML 버튼  태그가 받을 있는 표준속성(onClick, type. name등)
 */
export function Button({ intent, size, thickness, inValid, children, className, ...props }) {
  const state = inValid ? 'inValid' : 'valid';
  const variants = buttonVariants({ intent, size, thickness, state });
  // 안전하게 클래스 합치기 뒷부분(className) 우선적용우선적용
  const classes = cn(variants, className)
  const isDisabled = props.disabled || inValid;
  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      <p className='font-noto font-semibold'>{children}</p>
    </button>
  )
}