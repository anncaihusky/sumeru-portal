import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Search, GraduationCap, AppWindow, PlayCircle } from 'lucide-react';

export default function SumeruPortal() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef(null);

  // 风格 A 的测试音频链接：纯净磬声 (Mixkit Zen Gong)
  const zenGongUrl = "https://assets.mixkit.co/music/preview/mixkit-zen-meditation-gong-sound-128.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        // 尝试播放，并处理浏览器可能存在的自动播放限制报错
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("音频播放需要用户交互:", error);
            setIsMusicOn(false); // 如果播放失败，重置开关状态
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-serif">
      {/* 右上角控制区 */}
      <nav className="fixed top-8 right-10 flex items-center gap-6 z-50">
        <button className="text-[11px] font-bold tracking-widest border-b border-stone-900 pb-1 uppercase">
          ZH / EN
        </button>
        <div className="w-[1px] h-4 bg-stone-200"></div>
        <button 
          onClick={() => setIsMusicOn(!isMusicOn)} 
          className="hover:scale-110 transition-transform text-stone-900"
        >
          {isMusicOn ? <Volume2 size={18} strokeWidth={1.5} /> : <VolumeX size={18} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* 隐藏的音频元素 - 风格 A */}
      <audio 
        ref={audioRef}
        loop 
        src={zenGongUrl} 
      />

      {/* 主体内容（保持之前的 Google 极简风格） */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl tracking-[0.5em] font-light mb-16 opacity-80">SUMERU</h1>
        {/* ... 搜索框和三大入口 ... */}
      </main>

      {/* 底部版权 */}
      <footer className="fixed bottom-8 w-full text-center">
        <p className="text-[9px] text-stone-400 tracking-[0.3em] uppercase">
          @2026 Boston Bilingual Pioneer Media
        </p>
      </footer>
    </div>
  );
}