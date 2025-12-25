JavaScript

import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function SumeruPortal() {
  const [showAbout, setShowAbout] = useState(false);
  const [lang, setLang] = useState('zh');

  const content = {
    zh: {
      tagline: "成就之轴",
      desc1: "通过“成就之轴”架构发现你的核心使命，这是一个集网络课程、移动应用和严肃游戏于一体的革命性生态系统。",
      desc2: "通过契合天道来掌握现实的隐藏算法，将自己转变为一名以战略智慧和灵性深度驾驭生活的“超级玩家”。",
      desc3: "超越数字与存在的幻象，最终“登出”游戏，达到一种绝对自由与自在逍遥的境界。"
    },
    en: {
      tagline: "The Axis of Becoming",
      desc1: "Discover your core purpose through our 'Axis of Becoming' framework, a revolutionary ecosystem integrating online courses, mobile apps, and serious games.",
      desc2: "Master the hidden algorithms of reality by aligning with the Dao, transforming yourself into a 'Super Player' who navigates life with strategic wisdom and spiritual depth.",
      desc3: "Transcend the digital and existential illusions to ultimately 'log out' of the game, attaining a state of absolute freedom and effortless spontaneity."
    }
  }[lang];

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-[#1A1A1A]">
      
      {/* 右下角的小信息图标 */}
      <button 
        onClick={() => setShowAbout(true)}
        className="fixed bottom-8 right-10 text-stone-300 hover:text-stone-900 transition-colors"
      >
        <Info size={18} strokeWidth={1.5} />
      </button>

      {/* “关于”弹窗 - 苹果式精致磨砂感 */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setShowAbout(false)}
            className="absolute top-10 right-10 p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="max-w-2xl text-center space-y-12">
            <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-stone-400">
              {content.tagline}
            }</h2>
            
            <div className="space-y-8 font-serif italic text-lg md:text-xl leading-relaxed opacity-90">
              <p className="animate-slide-up-1">{content.desc1}</p>
              <p className="animate-slide-up-2">{content.desc2}</p>
              <p className="animate-slide-up-3">{content.desc3}</p>
            </div>
          </div>
        </div>
      )}

      {/* ... 之前的搜索和导航内容 ... */}
    </div>
  );
}
