'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CardTitle } from '@/components/common/card-title/CardTitle';
import { Button } from '@/components/ui/button/Button';
import { cardService } from '@/libs/services/cardService';
import { cn } from '@/libs/utils/cn';

import { ArrowIcon, BackIcon } from './_components/Icons';

const GRADES = [
  { value: 'common', label: 'COMMON', color: 'text-main' },
  { value: 'rare', label: 'RARE', color: 'text-blue' },
  { value: 'super', label: 'SUPER RARE', color: 'text-purple' },  // 잘못된 POST 를 보냈을때 실패 예시로 super로 만들었습니다.
  { value: 'legendary', label: 'LEGENDARY', color: 'text-red' },
];

const GENRES = [
  { value: 'travel', label: '여행' },
  { value: 'landscape', label: '풍경' },
  { value: 'portrait', label: '인물' },
  { value: 'object', label: '사물' },
];

export default function PhotoCardCreation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [file, setFile] = useState(null); // 파일 객체 저장 상태 추가

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm({
    type: 'onChange',
    defaultValues: {
      name: '',
      grade: '',
      genre: '',
      price: '',
      totalQuantity: '',
      photoUrl: '',
      description: '',
    },
  });

  const router = useRouter();

  const selectedGrade = watch('grade');
  const selectedGenre = watch('genre');

  const currentGradeObj = GRADES.find((g) => g.value === selectedGrade);
  const currentGenreObj = GENRES.find((g) => g.value === selectedGenre);

  const onSubmit = async (data) => {
    if (isLoading) return;
    if (!file) {
      setError('photoUrl', { type: 'manual', message: '사진 파일을 선택해야 합니다.' });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('grade', data.grade);
    formData.append('genre', data.genre);
    formData.append('price', data.price);
    formData.append('totalQuantity', data.totalQuantity);
    formData.append('description', data.description);

    formData.append('uploads', file);

    try {
      const json = await cardService.createCard(formData);
      const photoCard = json.result.photoCard;


      router.push(
        `/gallery/create/success?name=${encodeURIComponent(
          photoCard.name,
        )}&grade=${encodeURIComponent(photoCard.grade)}`,
      );
    } catch (error) {
      console.error('API Error:', error);

      router.push(
        `/gallery/create/fail?name=${encodeURIComponent(data.name)}&grade=${encodeURIComponent(
          data.grade,
        )}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValue('photoUrl', selectedFile.name);
      setError('photoUrl', null);
    } else {
      setFile(null);
      setValue('photoUrl', '');
    }
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleSelect = (field, value) => {
    setValue(field, value);
    setIsDropdownOpen(null);
  };

  return (
    <main className="min-h-screen md:container mx-auto text-white">
      <div className="hidden sm:block sm:mb-20">
        <CardTitle
          size="L"
          titleMessage="포토카드 생성"
          className="font-br text-5xl tracking-[-1.44px] sm:mb-5 sm:mt-10 md:text-[3.875rem] md:tracking-[-1.86px]"
        />
      </div>
      <div className="max-w-480 sm:mx-0 sm:flex sm:flex-col">
        {/* 모바일 전용헤더 */}
        <header className="relative flex items-center justify-center gap-4 px-3.75 py-5 sm:hidden">
          <button className="absolute left-4 text-white text-2xl" onClick={() => router.back()}>
            <BackIcon />
          </button>
          <h1 className="text-xl font-br font-medium text-center">포토카드 생성</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-3.75 pb-6 sm:flex sm:flex-col sm:mx-auto"
        >
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">포토카드 이름</label>
            <input
              type="text"
              placeholder="포토카드 이름을 입력해 주세요"
              {...register('name')}
              className="h-13.75 w-full text-sm rounded-[2px] border border-gray-200 px-5 py-4.5 text-white placeholder:text-gray-200 focus:outline-none sm:max-w-130"
            />
            {errors.name && <p className="text-red text-xs mt-1">{errors.name}</p>}
          </section>
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">등급</label>
            <div className="relative">
              <div
                // Genre 테이블에 false 면 placeholder 글자가나오게
                className={cn(
                  `h-13.75 w-full rounded-[2px] border border-gray-200 bg-transparent px-5 py-4.5 text-sm cursor-pointer flex items-center sm:max-w-130`,
                  currentGradeObj ? currentGradeObj.color : 'text-gray-200',
                )}
                onClick={() => toggleDropdown('grade')}
              >
                {currentGradeObj ? currentGradeObj.label : '등급을 선택해 주세요'}
              </div>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-200">
                {isDropdownOpen === 'grade' ? (
                  <ArrowIcon isOpen={true} />
                ) : (
                  <ArrowIcon isOpen={false} />
                )}
              </span>
              {isDropdownOpen === 'grade' && (
                <ul className="absolute left-0 right-0 top-full mt-2 rounded-[2px] border border-gray-200 bg-gray-500 z-1 max-h-60 overflow-y-scroll">
                  {GRADES.map((grade) => (
                    <li
                      key={grade.value}
                      onClick={() => handleSelect('grade', grade.value)}
                      className={cn(
                        'px-5 py-3 text-sm cursor-pointer hover:bg-gray-400 transition-colors',
                        grade.color,
                        selectedGrade === grade.value && 'bg-gray-400',
                      )}
                    >
                      {grade.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors.grade && <p className="text-red text-xs mt-1">{errors.grade}</p>}
          </section>
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">장르</label>
            <div className="relative">
              <div
                onClick={() => toggleDropdown('genre')}
                className={cn(
                  'h-13.75 w-full rounded-[2px] border border-gray-200 bg-transparent px-5 py-4.5 text-sm  cursor-pointer flex items-center sm:max-w-130',
                  currentGenreObj ? 'text-white' : 'text-gray-200',
                )}
              >
                {currentGenreObj ? currentGenreObj.label : '장르를 선택해 주세요'}
              </div>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-200">
                {isDropdownOpen === 'genre' ? (
                  <ArrowIcon isOpen={true} />
                ) : (
                  <ArrowIcon isOpen={false} />
                )}
              </span>
              {isDropdownOpen === 'genre' && (
                <ul className="absolute left-0 right-0 top-full mt-2 rounded-[2px] border border-gray-200 bg-gray-500 z-1 max-h-60 overflow-y-scroll">
                  {GENRES.map((genre) => (
                    <li
                      key={genre.value}
                      onClick={() => handleSelect('genre', genre.value)}
                      className={cn(
                        'px-5 py-3 text-sm cursor-pointer hover:bg-gray-400 transition-colors',
                        selectedGenre === genre.value && 'bg-gray-400',
                      )}
                    >
                      {genre.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors.genre && <p className="text-red text-xs mt-1">{errors.genre}</p>}
          </section>
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">가격</label>
            <input
              type="number"
              placeholder="가격을 입력해 주세요"
              {...register('price')}
              className="h-13.75 w-full text-sm rounded-[2px] border border-gray-200 px-5 py-4.5 text-white placeholder:text-gray-200 focus:outline-none sm:max-w-130"
            />
            {errors.price && <p className="text-red text-xs mt-1">{errors.price.message}</p>}
          </section>
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">총 발행량</label>
            <input
              type="text"
              placeholder="총 발행량을 입력해 주세요"
              {...register('totalQuantity')}
              className="h-13.75 w-full text-sm rounded-[2px] border border-gray-200 px-5 py-4.5 text-white placeholder:text-gray-200 focus:outline-none sm:max-w-130"
            />
            {errors.totalQuantity && (
              <p className="text-red text-xs mt-1">{errors.totalQuantity.message}</p>
            )}
          </section>
          <section className="mb-7">
            <label className="mb-3 block text-sm font-medium">사진 업로드</label>
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder={file ? file.name : '사진 업로드'}
                {...register('photoUrl')}
                className="w-full h-13.75 flex-3 text-sm rounded-[2px] border border-gray-200 px-5 py-4.5 text-white placeholder:text-gray-200 focus:outline-none sm:max-w-97.5"
                onFocus={(e) => e.target.blur()}
                readOnly
              />
              {/* hidden input */}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center w-full h-13.75 flex-1 text-nowrap rounded-[2px] bg-black py-4.5 px-7 border border-main font-medium text-black hover:bg-main/90 sm:max-w-30"
              >
                <p className="text-main text-sm">파일 선택</p>
              </label>
            </div>
            {errors.photoUrl && <p className="text-red text-xs mt-1">{errors.photoUrl.message}</p>}
          </section>
          <section className="mb-8">
            <label className="mb-3 block text-sm font-medium">포토카드 설명</label>
            <textarea
              placeholder="포토카드 설명을 적어주세요"
              {...register('description')}
              className="bg-gray-500 min-h-[140px] text-sm w-full rounded-[2px] border border-gray-200 px-5 py-3 text-white placeholder:text-gray-200 resize-none focus:outline-none sm:max-w-130"
            />
          </section>
          <Button
            thickness="thin"
            message={isLoading ? '생성 중...' : '생성하기'}
            inValid={!isValid || isLoading}
            className="w-full max-w-130"
          >
            생성하기
          </Button>
        </form>
      </div>
    </main>
  );
}
