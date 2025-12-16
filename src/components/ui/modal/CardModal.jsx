'use client';
// 교환희망 정보 모달
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import BackArrowIcon from '@/assets/icons/Ic_back.svg';
import X_Icon from '@/assets/icons/Ic_x.svg';
import img_card from '@/assets/images/img_card.svg';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { saleService } from '@/libs/services/saleService';
import { cn } from '@/libs/utils/cn';

import { Button } from '../button/Button';
import { CardCounterInput } from '../input/CardCounterInput';

const SelectField = forwardRef(({ children, className = '', value, onChange, ...props }, ref) => {
  const handleChange = (e) => {
    onChange?.(e);
  };

  const placeholderClass = value === '' ? 'text-gray-200' : 'text-white';

  return (
    <select
      ref={ref}
      value={value}
      onChange={handleChange}
      className={cn(
        'w-full bg-black sm:bg-gray-500 py-4.5 px-5 border border-gray-200 rounded-[2px]',
        placeholderClass,
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
SelectField.displayName = 'SelectField';

/**
 * @param {String} type sell이면 나의 포토카드 판매하기 아니면 수정하기용 모달
 * @returns
 */
export function CardModal({ type, onClose, card }) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      price: 0,
      grade: '',
      genre: '',
      description: card.description || '',
    },
  });

  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const subject = type === 'sell' ? '나의 포토카드 판매하기' : '수정하기';
  const fullImageUrl = card?.imageUrl
    ? card.imageUrl.startsWith('http')
      ? card.imageUrl
      : `${baseHost}/${card.imageUrl}`
    : img_card; // 기본 이미지는 폴백

  const onCloseBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = async (data) => {
    try {
      const saleData = {
        userCardId: card.id,
        quantity: Number(data.quantity),
        price: Number(data.price),
        description: data.description,
        grade: data.grade,
        genre: data.genre,
      };

      await saleService.createSale(saleData);

      router.push(
        `/selling/complete/success?name=${encodeURIComponent(card.name)}&quantity=${data.quantity}&grade=${data.genre}`,
      );

      onClose();
    } catch (error) {
      console.error('판매 등록 실패:', error);
      router.push(`/selling/complete/fail?name=${encodeURIComponent(card.name)}`);
    }
  };
  return (
    <section
      className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 sm:items-end md:items-center"
      onClick={onCloseBackdrop}
    >
      <div
        className={cn(
          'w-full bg-black border flex flex-col overflow-hidden overflow-y-scroll',
          'min-h-screen h-full py-0 px-0 rounded-none', // 모바일 우선 사이즈 (전체 화면 모달)
          'sm:min-h-0 sm:max-h-[90vh] sm:bg-gray-500 py-3.75 sm:px-2.5', // 태블릿 (768px - bottomSheet디자인)
          'sm:rounded-t-[2px] sm:rounded-b-none sm:border-b-0',
          'md:max-w-290 md:max-h-250 md:py-15 md:px-30', // 데스크톱 (1280px 이상 - 모달 스타일)
          'md:h-auto md:rounded-[2px] md:mt-0',
        )}
      >
        {/* tablet bottom-sheet 구분선 */}
        <div className="justify-center pt-2 pb-4 hidden sm:flex md:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full max-w-full mx-auto sm:max-w-none">
          <header className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center sm:hidden">
                <button
                  className="relative w-[10.15px] h-[17.699px] text-white text-xl pr-4"
                  onClick={() => onClose()}
                >
                  <Image src={BackArrowIcon} alt="뒤로가기 버튼" fill />
                </button>
              </div>
              <h1
                className="
              text-[1.25rem] font-br text-white tracking-[-0.6px] text-center
             sm:text-gray-300 sm:text-base sm:text-left sm:tracking-[-0.72px]
              md:text-2xl
              "
              >
                {subject}
              </h1>
              <button
                className="hidden md:block text-gray-400 hover:text-white text-3xl transition"
                onClick={() => onClose()}
              >
                <Image src={X_Icon} alt="닫기 버튼" />
              </button>
              <div className="w-10 sm:hidden"></div>
            </div>
          </header>
        </div>

        <div className="w-full overflow-y-auto px-6 pb-20 sm:px-0">
          <div className="w-full overflow-y-auto px-6">
            <CardTitle
              size="L"
              titleMessage={card.name}
              className="text-2xl sm:text-[2rem] md:text-[2.5rem] font-bold mb-5"
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="flex justify-between">
                <div className="flex flex-col w-full gap-4 mt-4 sm:flex-row sm:gap-5 md:gap-10">
                  <div className="relative aspect-video bg-gray-900 rounded-lg object-cover sm:min-w-20 sm:max-w-85.5 sm:max-h-[16.0313rem] md:max-w-110 md:max-h-82.5 sm:flex-1">
                    <Image src={fullImageUrl} alt="기본 이미지" fill />
                  </div>
                  <div className="sm:flex-1 sm:w-full">
                    <CardCounterInput
                      card={card}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                      watch={watch}
                    />
                  </div>
                </div>
              </section>

              {/*교환 희망 정보 섹션*/}
              <section className="pt-6">
                <CardTitle
                  size="L"
                  titleMessage="교환 희망 정보"
                  className="text-[1.375rem] font-bold mb-2.5 mt-0"
                />
                <div className="flex flex-col sm:flex-row gap-4 sm:mb-8.5">
                  <div className="w-full">
                    <p className="text-white font-bold mb-2.5 mt-11.5">등급</p>
                    <Controller
                      name="grade"
                      control={control}
                      rules={{ required: '등급을 선택해주세요' }}
                      render={({ field }) => (
                        <SelectField {...field} value={field.value || ''}>
                          <option value="" disabled>
                            교환 등급 선택
                          </option>
                          <option value="COMMON">COMMON</option>
                          <option value="RARE">RARE</option>
                          <option value="SUPER_RARE">SUPER RARE</option>
                          <option value="LEGENDARY">LEGENDARY</option>
                        </SelectField>
                      )}
                    />
                    {errors.grade && (
                      <span className="text-red text-xs mt-1">{errors.grade.message}</span>
                    )}
                  </div>
                  <div className="w-full mb-8.5 sm:mb-0">
                    <p className="text-white font-bold mb-2.5 sm:mt-11.5">장르</p>
                    <Controller
                      name="genre"
                      control={control}
                      rules={{ required: '장르를 선택해주세요' }}
                      render={({ field }) => (
                        <SelectField {...field} value={field.value || ''}>
                          <option value="" disabled>
                            교환 장르 선택
                          </option>
                          <option value="TRAVEL">여행</option>
                          <option value="LANDSCAPE">풍경</option>
                          <option value="PORTRAIT">인물</option>
                          <option value="OBJECT">사물</option>
                        </SelectField>
                      )}
                    />
                    {errors.genre && (
                      <span className="text-red text-xs mt-1">{errors.genre.message}</span>
                    )}
                  </div>
                </div>

                {/* 교환 희망 관련 상세 내용 입력 (시안의 textarea) */}
                <section className="mb-15">
                  <p className="text-white text-base font-bold mb-2.5">교환 희망 설명</p>
                  <textarea
                    className="w-full bg-gray-500 text-white py-3 px-5 border border-gray-200 rounded-[2px] resize-none placeholder-gray-200 placeholder:text-sm placeholder:font-light"
                    placeholder="설명을 입력해 주세요"
                    rows={3}
                    {...register('description')}
                  />
                </section>
                <div className="border-t border-gray-400 mb-7.5 sm:hidden md:block"></div>
                <footer className="flex gap-3.75">
                  <Button
                    intent="secondary"
                    thickness="thin"
                    size="L"
                    type="button"
                    onClick={() => onClose()}
                  >
                    취소하기
                  </Button>
                  <Button thickness="thin" size="L" type="submit">
                    판매하기
                  </Button>
                </footer>
              </section>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
