/**
 * 전역으로 사용할 not-found
 */

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div class="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 overflow-hidden relative">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div class="relative z-10 text-center space-y-8">

        <div class="relative w-64 h-80 mx-auto mb-12 transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
          <div class="absolute inset-0 bg-neutral-800 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
              <svg class="w-48 h-48 text-white/5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c0-1.1.9-2-2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
          </div>

          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-full h-[2px] bg-[#0a0a0a] rotate-[45deg] scale-150 shadow-[0_0_10px_rgba(0,0,0,1)]"></div>
            <div class="w-full h-[2px] bg-[#0a0a0a] rotate-[-20deg] scale-150 shadow-[0_0_10px_rgba(0,0,0,1)]"></div>
          </div>

          <div class="absolute -bottom-6 -right-6 bg-yellow-400 text-black font-black text-4xl px-4 py-2 rounded-lg rotate-12 shadow-xl">
            404
          </div>
        </div>

        <div class="space-y-4">
          <h1 class="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
            길을 잃으셨나요?
          </h1>
          <p class="text-neutral-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
            찾으시는 카드가 찢어졌거나, <br />
            마켓에서 이미 솔드아웃 된 것 같아요.
          </p>
        </div>

        <div class="pt-8">
          <Link href="/" class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black focus:outline-none">
            <span class="relative uppercase tracking-widest text-sm">메인 마켓으로 돌아가기</span>
          </Link>
        </div>

        <p class="pt-20 text-neutral-600 text-xs tracking-[0.2em] uppercase">
          &copy; 2025 Hello My Photo. All rights reserved.
        </p>
      </div>
    </div>
  )
}