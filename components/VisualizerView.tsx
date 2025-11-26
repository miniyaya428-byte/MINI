import React, { useState } from 'react';
import { Wand2, Loader2, Image as ImageIcon, Sofa, BedDouble, Utensils, Bath, Coffee, Download, Palette, Sparkles } from 'lucide-react';
import { generateDesignImage } from '../services/geminiService';

interface SpaceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string; // Describes the geometry and furniture layout
}

interface StyleConfig {
  id: string;
  name: string;
  description: string;
  prompt: string; // Describes materials, colors, and atmosphere
  color: string;
}

const styles: StyleConfig[] = [
  {
    id: 'japandi',
    name: '日式侘寂',
    description: '溫潤木質與留白',
    color: 'bg-[#d4c5b0]',
    prompt: 'Japanese Japandi style. Color palette: Warm beige, off-white, and light oak wood. Atmosphere: Zen, serene, minimalist, natural light. Materials: Matte mineral paint, natural wood, linen fabrics.'
  },
  {
    id: 'luxury',
    name: '現代輕奢',
    description: '石材金屬質感',
    color: 'bg-stone-800 text-white',
    prompt: 'Modern Luxury style. Color palette: High contrast black, white, and grey with brass/gold accents. Atmosphere: Sophisticated, expensive, hotel-like. Materials: Marble stone, glossy surfaces, leather, velvet, brass metal details.'
  },
  {
    id: 'scandi',
    name: '北歐極簡',
    description: '明亮灰階色調',
    color: 'bg-[#e5e7eb]',
    prompt: 'Scandinavian Minimalist style. Color palette: Bright white, light grey, and pale wood. Atmosphere: Hygge, cozy, airy, bright. Materials: White painted walls, light birch wood, soft wool textures, functional furniture.'
  },
  {
    id: 'industrial',
    name: '工業 Loft',
    description: '水泥灰與鐵件',
    color: 'bg-[#57534e] text-white',
    prompt: 'Modern Industrial Loft style. Color palette: Concrete grey, black, and dark walnut wood. Atmosphere: Raw, edgy, moody. Materials: Exposed concrete walls, black iron/metal details, dark leather, track lighting.'
  }
];

const spaces: SpaceConfig[] = [
  {
    id: 'living',
    name: '客廳',
    icon: <Sofa size={16} />,
    prompt: `
      Interior design visualization of a living room.
      Perspective focused on the depth of the room (4.9 meters).
      Key Architectural Feature: A continuous wall of vertical slats (grille) that seamlessly hides the bedroom doors (hidden doors/invisible doors).
      Opposite wall is a feature wall.
      Includes a minimalist sofa and a low suspended TV platform.
      Layout width 3.9 meters.
      High quality, 4k render, architectural photography style.
    `
  },
  {
    id: 'dining',
    name: '餐廚',
    icon: <Utensils size={16} />,
    prompt: `
      Interior design visualization of a dining area and kitchen connection.
      Layout width 3.9 meters.
      A dining table peninsula integrated with the kitchen cabinetry to maximize space.
      Floor-to-ceiling cabinets.
      Pendant lights over the dining area.
      Clean, airy atmosphere.
      High quality, 4k render.
    `
  },
  {
    id: 'master',
    name: '主臥',
    icon: <BedDouble size={16} />,
    prompt: `
      Interior design visualization of a master bedroom.
      Features a built-in wardrobe maximizing vertical space.
      A headboard panel with indirect lighting to soften the beam overhead.
      Cozy atmosphere.
      High quality, 4k render.
    `
  },
  {
    id: 'secondary',
    name: '次臥',
    icon: <Coffee size={16} />,
    prompt: `
      Interior design visualization of a small versatile room (study/guest room).
      Raised floor platform (Tatami style or wooden platform) with storage underneath.
      A compact desk area near the window.
      High quality, 4k render.
    `
  },
  {
    id: 'bathroom',
    name: '衛浴',
    icon: <Bath size={16} />,
    prompt: `
      Interior design visualization of a modern bathroom.
      Floating vanity cabinet.
      Large mirror with backlight.
      Stone or tile finishes.
      Spa-like atmosphere.
      High quality, 4k render.
    `
  }
];

export const VisualizerView: React.FC = () => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(spaces[0].id);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(styles[0].id);
  const [loading, setLoading] = useState(false);
  // Store images key by "spaceId-styleId" to cache different versions
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const selectedSpace = spaces.find(s => s.id === selectedSpaceId) || spaces[0];
  const selectedStyle = styles.find(s => s.id === selectedStyleId) || styles[0];
  
  // Composite key for caching
  const cacheKey = `${selectedSpaceId}-${selectedStyleId}`;
  const currentImage = generatedImages[cacheKey];

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      setError("API Key not found in environment.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Combine Style Prompt + Space Prompt
      const finalPrompt = `
        ${selectedStyle.prompt}
        
        ${selectedSpace.prompt}
      `;

      const imageBase64 = await generateDesignImage(finalPrompt);
      if (imageBase64) {
        setGeneratedImages(prev => ({
          ...prev,
          [cacheKey]: imageBase64
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

  const handleDownload = () => {
    if (currentImage) {
      const link = document.createElement('a');
      link.href = currentImage;
      link.download = `MSpace_${selectedSpace.name}_${selectedStyle.name}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-md mx-auto h-full flex flex-col">
       <div className="mb-4">
        <h2 className="text-2xl font-bold text-stone-800">AI 空間模擬</h2>
        <p className="text-stone-500 text-sm">選擇空間與風格，預覽未來居家</p>
      </div>

      {/* 1. Space Selector */}
      <div className="mb-4">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block ml-1">
          1. 選擇區域
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpaceId(space.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
                selectedSpaceId === space.id
                  ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {space.icon}
              <span className="text-xs font-bold">{space.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Style Selector */}
      <div className="mb-6">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block ml-1 flex items-center gap-1">
          2. 選擇風格 <Palette size={12} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyleId(style.id)}
              className={`relative overflow-hidden p-3 rounded-xl border text-left transition-all ${
                selectedStyleId === style.id
                  ? 'border-stone-800 bg-stone-50 shadow-sm ring-1 ring-stone-800'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full mb-2 flex items-center justify-center text-[10px] font-bold shadow-sm ${style.color}`}>
                {style.name[0]}
              </div>
              <p className={`text-sm font-bold ${selectedStyleId === style.id ? 'text-stone-800' : 'text-stone-600'}`}>
                {style.name}
              </p>
              <p className="text-[10px] text-stone-400 truncate">
                {style.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Image Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] bg-stone-100 rounded-3xl border border-dashed border-stone-300 relative overflow-hidden shadow-inner transition-all group">
        {currentImage ? (
          <>
            <img 
              src={currentImage} 
              alt={`AI Generated ${selectedSpace.name} - ${selectedStyle.name}`} 
              className="w-full h-full object-cover animate-in fade-in duration-700"
            />
            {/* Style Badge on Image */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-medium border border-white/20">
              {selectedStyle.name} • {selectedSpace.name}
            </div>

            <button 
              onClick={handleDownload}
              className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95 z-20"
              title="下載圖片"
            >
              <Download size={20} />
            </button>
          </>
        ) : (
          <div className="text-center p-6 max-w-[280px]">
            <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
              <Sparkles className="text-amber-400" size={32} />
            </div>
            <p className="text-stone-500 font-medium mb-1">
              {selectedStyle.name}風的{selectedSpace.name}
            </p>
            <p className="text-stone-400 text-xs">
              點擊下方按鈕，AI 將為您繪製{selectedStyle.description}的空間模擬圖
            </p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <Loader2 className="animate-spin text-amber-600 mb-2" size={40} />
            <p className="text-stone-600 font-medium text-sm animate-pulse">
              正在繪製 {selectedStyle.name} {selectedSpace.name}...
            </p>
            <p className="text-stone-400 text-xs mt-1">這需要幾秒鐘的時間</p>
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
        className="mt-6 w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-xl shadow-stone-200"
      >
        <Wand2 size={20} className={loading ? 'animate-pulse' : ''} />
        {loading ? '生成中...' : currentImage ? '重新生成' : '開始模擬'}
      </button>
    </div>
  );
};
