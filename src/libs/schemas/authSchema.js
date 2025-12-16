/**
 * 추후 react-hook-form 과 zod를 이용한
 * [FE] zod 유효성 검사
 */

// 로그인, 회원가입 예시
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('이메일 형식이 아닙니다.'),
    // .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '정확한 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호를 8자 이상 작성해주세요.'),
});

const signupFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email('이메일 형식이 아닙니다.'),
      // .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '정확한 이메일을 입력해주세요.'),
    nickname: z.string().trim().min(2, '닉네임은 2글자 이상이어야합니다.'),
    password: z.string().min(8, '비밀번호를 8자 이상 작성해주세요.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다!',
  });

export const authSchema = {
  login: loginFormSchema,
  signup: signupFormSchema,
};
