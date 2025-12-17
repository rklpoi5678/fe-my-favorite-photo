"use client"

import Image from "next/image";
import { useEffect, useState } from "react"

import Minus from "@/assets/icons/Ic_minus.svg"
import Plus from "@/assets/icons/Ic_plus.svg"

import GradeLabel from "../label/GradeLabel";

export function CardCounterInput({ card, cardData, errors, register, setValue, getValues, type }) {
  const isEdit = type === "edit";
  const maxLimit = isEdit
    ? card.quantity
    : (card.totalQuantity || 0)
  const [price, setPrice] = useState(getValues('price') ?? (isEdit ? card.price : ''))
  const [quantity, setQuantity] = useState(getValues('quantity') ?? (isEdit ? card.quantity : 1))

  useEffect(() => {
    setValue('quantity', Number(quantity), { shouldValidate: true, shouldDirty: true });
  }, [quantity, setValue]);

  useEffect(() => {
    setValue('price', price, { shouldValidate: true, shouldDirty: true });
  }, [price, setValue]);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 10) {
      setPrice(value)
    }
  }
  const incrementQuantity = () => {
    if (quantity < maxLimit) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="text-white">
      <div className="max-w-85.5 max-h-49 lg:max-w-110 lg:max-h-23.75">
        <div className="border-b border-gray-400">
          <div className="flex items-center mb-7.5 px-0">
            <GradeLabel grade={cardData.grade} size />
            <span className="mx-4 text-lg text-gray-400 font-bold sm:text-2xl">|</span>
            <h2 className="text-lg font-bold text-gray-300 sm:text-2xl">
              {cardData.genre}
            </h2>
            <div className="ml-auto">
              <h2 className="text-lg font-bold underline sm:text-2xl">
                {card.seller?.nickname || card.nickname}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <label className="text-lg md:text-[1.25rem] text-nowrap">
              {isEdit ? '판매 수량 수정' : '총 판매 수량'}
            </label>
            <div className="w-13 sm:w-9 shrink"></div>
            <div className="flex items-center gap-3.75 flex-1">
              <div className="flex items-center justify-center rounded-[2px] border border-gray-200 px-3 py-2.5 flex-1">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="relative flex flex-1 justify-start w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
                >
                  <Image src={Minus} alt="빼기" />
                </button>
                <span className="text-center text-lg sm:text-[1.25rem]">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  disabled={quantity >= maxLimit}
                  className="relative flex flex-1 justify-end w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
                >
                  <Image src={Plus} alt="더하기" />
                </button>
              </div>
              <input
                type="hidden"
                {...register("quantity", {
                  valueAsNumber: true,
                  required: "수량은 필수입니다.",
                  min: { value: 1, message: "최소 1개 이상이어야 합니다." },
                  max: { value: maxLimit, message: `최대 ${maxLimit}장까지 가능합니다` }
                })}
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-nowrap text-[1.25rem]">/ {maxLimit}</span>
                <div className="text-[12px] text-gray-200 text-nowrap font-light sm:text-[14px]">
                  {isEdit ? '수정 가능 최대치' : `최대 ${maxLimit}장`}
                </div>
              </div>
            </div>
          </div>
          {errors.quantity && <span className="text-red text-xs mt-[-10px]">{errors.quantity.message}</span>}

          {/* Price Per Unit */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <label className="text-lg text-nowrap md:text-[1.25rem]">장당 가격</label>
              <div className="w-18 shrink"></div>
              <div className="relative w-64">
                <input
                  type="text"
                  name="price"
                  onChange={handlePriceChange}
                  className="w-full rounded-[2px] border border-gray-200 bg-transparent text-lg text-white focus:outline-none placeholder:text-sm placeholder:font-light px-5 py-2.25 sm:pr-6 sm:placeholder:text-base"
                  placeholder="숫자만 입력"
                  {...register("price", { required: "가격을 입력해주세요.", min: { value: 0, message: "가격은 0포인트 이상이어야 합니다." } })}
                />
                {errors.price && <span className="text-red text-xs mt-1">{errors.price.message}</span>}
                <span className="pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 text-lg font-bold text-white sm:text-[1.25rem]">
                  P
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}    