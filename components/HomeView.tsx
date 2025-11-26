import React from 'react';
import { Ruler, PaintBucket, Layout, ArrowRight, Scan, Maximize2, MoveHorizontal, Sparkles } from 'lucide-react';
import { AppTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: AppTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto animate-in fade-in duration-500">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-stone-800 mb-1">空間總覽</h1>
        <p className="text-stone-500 text-sm">台北信義區・17.8 坪・格局優化配置</p>
      </header>

      {/* Hero Spatial DNA Card - Focus on Plan Dimensions */}
      <div className="bg-stone-900 rounded-3xl p-6 text-white shadow-xl shadow-stone-200 mb-6 relative overflow-hidden">
        {/* Abstract Architectural Lines Decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 border border-stone-700 rounded-full -mr-16 -mt-16 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border border-stone-700 rounded-full -ml-16 -mb-16 opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6 opacity-90">
            <Scan size={18} className="text-amber-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-stone-300">Layout Blueprint</span>
          </div>
          
          {/* Main Dimensions Grid */}
          <div className="grid grid-cols-2 gap-8 mb-6 border-b border-stone-700 pb-6">
            <div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold tracking-tight">490</span>
                <span className="text-sm font-medium text-stone-400">cm</span>
              </div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">客餐廳縱深</p>
            </div>
            <div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold tracking-tight">392.5</span>
                <span className="text-sm font-medium text-stone-400">cm</span>
              </div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">客廳面寬</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-2 text-amber-400">
                 <MoveHorizontal size={16} />
                 <span className="text-sm font-bold">核心設計策略</span>
               </div>
               <p className="text-xs text-stone-300 leading-relaxed font-light">
                 整合 <strong>G2-2 隔間牆</strong> 為連續性視覺軸線。利用 490cm 的縱深優勢，將「隱藏式格柵門」與「收納櫃體」整合於同一立面，拉闊空間感，化解破碎門片。
               </p>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onNavigate(AppTab.VISUALIZER)}
            className="w-full group flex items-center justify-between bg-stone-800 hover:bg-stone-700 p-3 rounded-xl transition-colors border border-stone-700 active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-amber-900/30 p-2 rounded-lg text-amber-400">
                <Sparkles size={16} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-stone-200">AI 空間模擬</p>
                <p className="text-[10px] text-stone-400">Generate visuals for 490x392cm</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-stone-500 group-hover:text-stone-300 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Design Pillars */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-3 relative z-10">
            <Layout size={20} />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-stone-400 mb-1 font-medium">格局重點</p>
            <p className="text-sm font-bold text-stone-800">隱形格柵牆</p>
            <p className="text-[10px] text-stone-500 mt-1">整合主臥/次臥門片</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-stone-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 mb-3 relative z-10">
            <PaintBucket size={20} />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-stone-400 mb-1 font-medium">風格定調</p>
            <p className="text-sm font-bold text-stone-800">溫潤日式</p>
            <p className="text-[10px] text-stone-500 mt-1">淺橡木色 + 留白</p>
          </div>
        </div>
      </div>

      {/* Material Palette Based on Reference Images */}
      <div className="mb-8 animate-in slide-in-from-bottom-2 duration-700 delay-100">
        <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center gap-2 px-1">
          <span className="w-1 h-4 bg-amber-700 rounded-full"></span>
          材質計畫 (Material Palette)
        </h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
           {/* Item 1 */}
           <div className="shrink-0 w-28 space-y-3 group">
             <div className="w-28 h-28 rounded-2xl bg-[#e8e6e1] shadow-sm border border-stone-100 relative overflow-hidden transition-transform group-hover:-translate-y-1">
               <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
               <div className="absolute bottom-2 right-2 text-[10px] text-stone-400 font-mono">#F5F5F0</div>
             </div>
             <div className="text-center">
                <p className="text-sm font-bold text-stone-700">礦物塗料</p>
                <p className="text-[10px] text-stone-400">手作紋理米白</p>
             </div>
           </div>
           
           {/* Item 2 */}
           <div className="shrink-0 w-28 space-y-3 group">
             <div className="w-28 h-28 rounded-2xl bg-[#d4c5b0] shadow-sm relative overflow-hidden flex flex-col transition-transform group-hover:-translate-y-1">
               {/* Slat pattern simulation */}
               <div className="flex h-full w-full opacity-80">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="flex-1 border-r border-[#bba78e] bg-transparent transform skew-x-1"></div>
                 ))}
               </div>
               <div className="absolute bottom-2 right-2 text-[10px] text-stone-600 font-mono">#OAK</div>
             </div>
             <div className="text-center">
                <p className="text-sm font-bold text-stone-700">實木格柵</p>
                <p className="text-[10px] text-stone-400">淺橡木隱形門</p>
             </div>
           </div>

           {/* Item 3 */}
           <div className="shrink-0 w-28 space-y-3 group">
             <div className="w-28 h-28 rounded-2xl bg-[#a8a29e] shadow-sm transition-transform group-hover:-translate-y-1 border border-stone-200">
                <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/fabric-plaid.png')]"></div>
             </div>
             <div className="text-center">
                <p className="text-sm font-bold text-stone-700">織布軟裝</p>
                <p className="text-[10px] text-stone-400">暖灰色系沙發</p>
             </div>
           </div>
        </div>
      </div>
      
    </div>
  );
};