export default function GradeLabel({ grade, size }) {
  const gradeStyle = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };

  const textClass = size
    ? 'sm:text-[18px] sm:font-bold md:text-[18px] md:font-bold lg:text-[24px] lg:font-bold'
    : 'sm:text-[10px] sm:font-light md:text-[16px] lg:text-[16px]';

  const displayGrade = grade.replace('_', ' ');

  return (
    <div className={textClass}>
      <span className={gradeStyle[grade]}>{displayGrade}</span>
    </div>
  );
}
