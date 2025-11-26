import React, { useState } from 'react';
import { Wand2, Loader2, Image as ImageIcon, Sofa, BedDouble, Utensils, Bath, Coffee, Grid3X3 } from 'lucide-react';
import { generateDesignImage } from '../services/geminiService';

interface SpaceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string;
}

const spaces: SpaceConfig[] = [
  {
    id: 'living',
    name: '客廳',
    icon: <Sofa size={16} />,
    prompt: `
      Hyper-realistic interior design photo of a Japanese Japandi style living room.
      Perspective focused on the depth of the room (4.9 meters).
      Key Feature: A continuous wall of light oak vertical wood slats (grille) that seamlessly hides the bedroom doors (hidden doors/invisible doors).
      Opposite wall is textured off-white mineral paint (wabi-sabi texture).
      Light oak wood flooring.
      A minimalist grey sofa.
      Soft, warm ambient lighting.
      Clean lines, spacious feel.
      High quality, 4k render, architectural photography style.
    `
  },
  {
    id: 'dining',
    name: '餐廚',
    icon: <Utensils size={16} />,
    prompt: `
      Hyper-realistic interior design photo of a dining area and kitchen connection.
      Layout width 3.9 meters.
      A wooden dining table peninsula integrated with the kitchen cabinetry to maximize space.
      Floor-to-ceiling wooden cabinets (light oak).
      Warm pendant lights.
      Clean, minimalist, airy atmosphere.
      Japanese modern style with vertical wood details.
      High quality, 4k render.
    `
  },
  {
    id: 'master',
    name: '主臥',
    icon: <BedDouble size={16} />,
    prompt: `
      Hyper-realistic interior design photo of a master bedroom.
      Layout based on floor plan.
      Features a built-in wardrobe (white or light wood) maximizing vertical space.
      A wooden headboard panel with indirect lighting to soften the beam overhead.
      Cozy, serene atmosphere, soft linen bedding.
      Light wood flooring.
      High quality, 4k render.
    `
  },
  {
    id: 'secondary',
    name: '次臥',
    icon: <Coffee size={16} />,
    prompt: `
      Hyper-realistic interior design photo of a small versatile room (study/guest room).
      Raised wooden floor platform (Tatami style) with storage underneath.
      A compact desk area near the window.
      Minimalist Japanese style.
      High quality, 4k render.
    `
  },
  {
    id: 'bathroom',
    name: '衛浴',
    icon: <Bath size={16} />,
    prompt: `
      Hyper-realistic interior design photo of a modern Japanese style bathroom.
      Clean lines, spa-like.
      Floating vanity cabinet with light wood grain finish matching the living room.
      Large mirror with backlight.
      Grey stone tiles.
      High quality, 4k render.
    `
  }
];

export const VisualizerView: React.FC = () => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(spaces[0].id);
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const selectedSpace = spaces.find(s => s.id === selectedSpaceId) || spaces[0];
  const currentImage = generatedImages[selectedSpaceId];

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      setError("API Key not found in environment.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const imageBase64 = await generateDesignImage(selectedSpace.prompt);
      if (imageBase64) {
        setGeneratedImages(prev => ({
          ...prev,
          [selectedSpaceId]: imageBase64
        }));
      } else {
        setError("無法產生圖片，請重試。");
      }
    } catch (err) {
      setError("發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-md mx-auto h-full flex flex-col">
       <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-800">AI 空間模擬</h2>
        <p className="text-stone-500 text-sm">依據真實平面尺寸生成</p>
      </div>

      {/* Space Selector */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
        {spaces.map((space) => (
          <button
            key={space.id}
            onClick={() => setSelectedSpaceId(space.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
              selectedSpaceId === space.id
                ? 'bg-stone-800 text-white border-stone-800 shadow-md scale-105'
                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {space.icon}
            <span className="text-xs font-bold">{space.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] bg-stone-100 rounded-3xl border border-dashed border-stone-300 relative overflow-hidden shadow-inner transition-all">
        {currentImage ? (
          <img 
            src={currentImage} 
            alt={`AI Generated ${selectedSpace.name}`} 
            className="w-full h-full object-cover animate-in fade-in duration-700"
          />
        ) : (
          <div className="text-center p-6">
            <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
              <ImageIcon className="text-stone-300" size={32} />
            </div>
            <p className="text-stone-400 text-sm">
              尚未生成<span className="text-stone-600 font-bold mx-1">{selectedSpace.name}</span>的模擬圖
              <br/>
              點擊下方按鈕開始繪製
            </p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <Loader2 className="animate-spin text-amber-600 mb-2" size={40} />
            <p className="text-stone-600 font-medium text-sm animate-pulse">
              正在繪製 {selectedSpace.name}...
            </p>
            <p className="text-stone-400 text-xs mt-1">模擬材質：淺橡木、格柵、塗料</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg text-center border border-red-100">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-6 w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-xl shadow-stone-200"
      >
        <Wand2 size={20} className={loading ? 'animate-pulse' : ''} />
        {loading ? '生成中...' : currentImage ? `重新生成${selectedSpace.name}` : `生成${selectedSpace.name}模擬圖`}
      </button>

      <div className="mt-6 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
          {selectedSpace.name} 設計重點
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedSpace.id === 'living' && (
            <>
              <span className="px-2 py-1 bg-amber-50 text-amber-800 text-[10px] rounded-md border border-amber-100">G2-2 隱形格柵牆</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">490cm 景深</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">礦物塗料白牆</span>
            </>
          )}
          {selectedSpace.id === 'master' && (
            <>
              <span className="px-2 py-1 bg-amber-50 text-amber-800 text-[10px] rounded-md border border-amber-100">樑下收納</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">間接照明</span>
            </>
          )}
          {selectedSpace.id === 'dining' && (
            <>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">中島餐桌整合</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">動線優化</span>
            </>
          )}
           {selectedSpace.id === 'secondary' && (
            <>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">架高地板收納</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">多功能房</span>
            </>
          )}
           {selectedSpace.id === 'bathroom' && (
            <>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">木紋浴櫃</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-md">SPA感</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};