import { cva } from 'class-variance-authority'
import Link from 'next/link';

import { Button } from "@/components/ui/button/Button"
import { cn } from '@/libs/utils/cn';

const cardTitleVariants = cva(
  "container flex justify-between items-center border-b border-gray-100",
  {
    variants: {
      size: {
        L: 'max-w-[1480px]',
        M: 'max-w-[704px]',
        S: 'max-w-[345px]'
      },
    },
    defaultVariants: {
      size: 'L',
      type: 'default'
    },
  },
)

/**
 * @param {'L' | 'M' | 'S'} size    컨테이너 최대 너비
 * @param {String} titleMessage     타이틀에 들어갈메시지 디자인시안에 맞게 예외글자들이 스타일이 변경됨("나의  포토카드 판매하기","우리집 앞마당")
 * @param {'primary' | 'secondary'} buttonIntent
 * @param {'L' | 'M' | 'S' | 'XS'} buttonSize   버튼의 크기
 * @param {String | undefined} [buttonMessage] 버튼에 들어갈메시지 (값이 없다면 버튼이 없는것으로 간주)
 * @param {String} [className]  타이틀 글자에 줄 속성
 * @param {String}  Link              링크
 * @param {object} [...]        HTML button 태그가 받을수 있는 모든 표준속성 (선택) 
 */
export function CardTitle({ size, titleMessage, buttonSize, buttonMessage, buttonIntent, LinkUrl, className, ...props }) {
  const classes = cn(cardTitleVariants({ size }), className)

  const pTagClasses = cn(
    'text-white leading-[-0.86px]',
    className
  )

  return (
    <div className={classes}>
      <p className={pTagClasses}>{titleMessage}</p>
      {buttonMessage && (
        <div className='mb-5.25'>
          {LinkUrl ? (
            <Link
              href={LinkUrl}
            >
              <Button size={buttonSize} thickness='thin' intent={buttonIntent} {...props} >
                {buttonMessage}
              </Button>
            </Link>
          ) : (
            <Button size={buttonSize} thickness='thin' intent={buttonIntent} {...props} >
              {buttonMessage}
            </Button>
          )
          }
        </div>
      )}
    </div>
  )
}