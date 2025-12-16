export default function GradeBox({ grade, count }) {
  const gradeStyle = {
    COMMON: 'text-main border-main',
    RARE: 'text-blue border-blue',
    SUPER_RARE: 'text-purple border-purple',
    LEGENDARY: 'text-pink border-pink',
  };

  return (
    <div
      className={`
        bg-black inline-flex items-center gap-[10px] border-[1px] font-light
        w-max
        sm:h-[30px] sm:px-[10px] sm:py-[6px] sm:text-[12px]
        md:h-[32px] md:px-[10px] md:py-[6px] md:text-[14px]
        lg:h-[40px] lg:px-[20px] lg:py-[8px] lg:text-[16px]
        ${gradeStyle[grade]}
      `}
    >
      <span className="whitespace-nowrap">{grade.replace('_', ' ')}</span>
      <span className="whitespace-nowrap">{count}장</span>
    </div>
  );
}
