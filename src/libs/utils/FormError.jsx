export default function FormError({ error }) {
  if (!error) return null;
  return <p className=" text-[#FF483D] text-[16px] font-light">{error.message}</p>;
}
