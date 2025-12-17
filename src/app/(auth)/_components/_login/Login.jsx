'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import logoImg from '@/assets/images/logo.png';
import { GoogleIcon, InvisibleIcon, VisibleIcon } from '@/assets/images/svg/icon';
import { authSchema } from '@/libs/schemas/authSchema';
import { useAuth } from '@/providers/AuthProvider';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

import FormError from '../../../../libs/utils/FormError';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [showEye, setShowEye] = useState(false);
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema.login),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);

      openModal(MODAL_TYPES.MODAL, {
        title: '로그인 성공',
        description: '최애의 포토에 오신 것을 환영합니다!',
        confirmText: '확인',
        onConfirm: () => {
          closeModal();
          sessionStorage.setItem('loginSuccess', 'true');
          closeModal();
          router.push('/market-place');
        },
      });
    } catch (error) {
      openModal(MODAL_TYPES.MODAL, {
        title: '로그인 실패',
        description: '이메일 또는 비밀번호를 확인해주세요.',
        confirmText: '확인',
        onConfirm: () => {
          closeModal();
        },
      });
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className=" mb-20">
        <Image src={logoImg} alt="signupImg" width={330} height={60} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <p className="  text-white font-noto text-[18px] font-normal leading-normal ">이메일</p>
            <input
              type="email"
              {...register('email')}
              className="flex  py-[18px] px-5  text-white border border-white"
              placeholder="이메일을 입력해주세요"
            />
            <FormError error={errors.email} />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="  text-white font-noto text-[18px] font-normal leading-normal ">
              비밀번호
            </p>
            <div className="relative">
              <input
                type={showEye ? 'text' : 'password'}
                {...register('password')}
                className="flex w-[600px] py-[18px] px-5   text-white border border-white"
                placeholder="8자 이상 입력해 주세요"
              />
              <button
                type="button"
                onClick={() => setShowEye((prev) => !prev)}
                className=" absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showEye ? (
                  <Image alt="visibleImg" src={VisibleIcon} className="w-6 h-6" />
                ) : (
                  <Image alt="invisibleImg" src={InvisibleIcon} className="w-6 h-6" />
                )}
              </button>
            </div>
            <FormError error={errors.password} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="flex h-[60px] py-[17px] px-[235px]  justify-center items-center gap-2.5 self-stretch rounded-xs bg-main mt-11  text-black text-center font-noto text-[18px] font-bold leading-normal"
          >
            로그인
          </button>
          <button
            type="button"
            className="flex h-[60px] justify-center items-center gap-3 self-stretch rounded-xs border border-gray-300 bg-white text-black font-noto text-[18px] font-normal leading-normal "
          >
            <Image src={GoogleIcon} alt="googleImg" />
            Google로 시작하기
          </button>
        </div>
        <div className="flex gap-2.5 justify-center items-center mt-[42px]">
          <p className="text-white font-noto text-[16px] font-normal leading-normal">
            최애의 포토가 처음이신가요?
          </p>
          <Link
            href="/signup"
            className="text-main font-noto text-[16px] font-normal leading-normal underline underline-offset-auto decoration-solid"
          >
            회원가입하기
          </Link>
        </div>
      </form>
    </section>
  );
}
