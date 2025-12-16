'use client';

export default function Modal({ isOpen, onClose, title, description, confirmText, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative w-[560px] h-[375px] rounded-xs bg-gray-500">
        <button onClick={onClose} className="absolute right-4 top-4" aria-label="close">
          <svg
            className="fill-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6.39953 18.6514L5.3457 17.5976L10.9457 11.9976L5.3457 6.39758L6.39953 5.34375L11.9995 10.9437L17.5995 5.34375L18.6534 6.39758L13.0534 11.9976L18.6534 17.5976L17.5995 18.6514L11.9995 13.0514L6.39953 18.6514Z" />
          </svg>
        </button>

        <h2 className="text-white text-center font-noto text-[20px] font-bold leading-normal mt-20 ">
          {title}
        </h2>
        <p className="text-gray-300 text-center font-noto text-[16px] font-normal leading-normal mt-10">
          {description}
        </p>
        <div className="flex justify-center items-center mt-[60px] ">
          <button
            onClick={onConfirm}
            className="  gap-2.5 rounded-xs px-20 bg-main py-[17px] text-black font-noto text-[18px] font-bold "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
