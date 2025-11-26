import React, { useState } from 'react';
import { Footprints, Tv, ChevronDown, Utensils, BedDouble, BookOpen, Bath, ArrowRightFromLine, ScanLine, Columns } from 'lucide-react';

interface ConceptSectionProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor: string;
  decorationColor: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const ConceptSection: React.FC<ConceptSectionProps> = ({ 
  title, 
  subtitle,
  icon, 
  iconColor, 
  decorationColor, 
  defaultOpen = false, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden transition-all duration-300 mb-4 last:mb-0">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none ${decorationColor}`}></div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left relative z-10 active:bg-stone-50 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`shrink-0 ${iconColor}`}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-stone-800 truncate">{title}</h3>
            {subtitle && <span className="text-xs text-stone-400 font-medium">{subtitle}</span>}
          </div>
        </div>
        <div className={`text-stone-400 shrink-0 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 animate-in slide-in-from-top-1 fade-in duration-200 border-t border-stone-50 pt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const DesignConceptView: React.FC = () => {
  return (
    <div className="pb-24 px-4 pt-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">空間配置策略</h2>
        <p className="text-stone-500 text-xs">依據平面圖：客廳面寬 392.5cm x 縱深 490cm</p>
      </div>

      <div className="space-y-1">
        
        {/* === LIVING AREA === */}
        <div className="mb-6">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 ml-2">公共領域 (Public Zone)</h3>
            
            {/* Section 2: Hidden Door Feature (Priority 1) */}
            <ConceptSection 
            title="G2-2 牆面：隱形格柵" 
            subtitle="Hidden Door Integration"
            icon={<Columns size={20} />} 
            iconColor="text-amber-800"
            decorationColor="bg-amber-100"
            defaultOpen={true}
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">連續性立面：</strong>針對平面圖中切割客廳與臥室的 G2-2 牆面，採用全幅寬的「淺橡木實木格柵」。</span>
                </li>
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">隱藏門設計：</strong>通往「主臥」與「次臥」的門片完全隱藏於格柵線條中（參考風格圖 5），消除門框造成的視覺破碎感，延展 490cm 的空間深度。</span>
                </li>
            </ul>
            </ConceptSection>

             {/* Section 1: Entrance */}
            <ConceptSection 
            title="玄關：機能整合" 
            subtitle="Efficient Storage"
            icon={<Footprints size={20} />} 
            iconColor="text-stone-700"
            decorationColor="bg-stone-100"
            defaultOpen={false}
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">懸空與照明：</strong>下方懸空 25cm 放置常穿鞋，配置暖色燈帶輕量化櫃體。</span>
                </li>
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">高處收納：</strong>雖然樓高不是唯一重點，但仍利用 360cm 高度在上方規劃換季儲物區，釋放下方日常活動空間。</span>
                </li>
            </ul>
            </ConceptSection>

            {/* Section 3: Living/TV */}
            <ConceptSection 
            title="電視牆：留白對比" 
            subtitle="Visual Focus"
            icon={<Tv size={20} />} 
            iconColor="text-stone-600"
            decorationColor="bg-stone-100"
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">一木一白：</strong>電視主牆使用米白礦物塗料（Texture Paint），與對面的木格柵牆形成材質對比，營造日式侘寂氛圍。</span>
                </li>
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">懸浮地台：</strong>捨棄厚重電視櫃，改用離地 20cm 的實木厚板地台，保留 392.5cm 面寬的通透感。</span>
                </li>
            </ul>
            </ConceptSection>

            {/* Section 4: Dining Area */}
            <ConceptSection 
            title="餐廚：尺度延伸" 
            subtitle="Spatial Flow"
            icon={<Utensils size={20} />} 
            iconColor="text-orange-700"
            decorationColor="bg-orange-50"
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">中島整合：</strong>在 392.5cm 的面寬軸線上，將電器櫃延伸出一座小型半島餐桌，區隔玄關與廚房，同時保持視線穿透。</span>
                </li>
            </ul>
            </ConceptSection>
        </div>

        {/* === PRIVATE AREA === */}
        <div className="mb-6">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 ml-2">私領域 (Private Zone)</h3>

            {/* Section 5: Master Bedroom */}
            <ConceptSection 
            title="主臥室" 
            subtitle="Rest Area"
            icon={<BedDouble size={20} />} 
            iconColor="text-stone-700"
            decorationColor="bg-stone-100"
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">樑下修飾：</strong>針對圖面床頭壓樑，以弧形包覆或收納櫃齊平樑下，化解壓迫感。</span>
                </li>
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">衣櫃配置：</strong>依據圖面凹槽處規劃整面落地衣櫃，門片採用白色烤漆或極簡木紋，融入牆面。</span>
                </li>
            </ul>
            </ConceptSection>

            {/* Section 6: Secondary Bedrooms / Study */}
            <ConceptSection 
            title="次臥：彈性空間" 
            subtitle="Versatile Room"
            icon={<BookOpen size={20} />} 
            iconColor="text-stone-600"
            decorationColor="bg-stone-50"
            >
            <ul className="space-y-3 text-stone-600 text-sm leading-relaxed">
                <li className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 shrink-0"></span>
                <span><strong className="text-stone-800">架高地坪：</strong>利用架高木地板界定空間，兼具客房與書房功能，地板下增加收納。</span>
                </li>
            </ul>
            </ConceptSection>
        </div>

      </div>
    </div>
  );
};