import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BudgetItem, MaterialItem } from '../types';

// Total Budget: 120萬 TWD
// Approx 17.8 Ping
const budgetData: BudgetItem[] = [
  { name: '木作工程 (櫃體/格柵/天花)', value: 450000, color: '#d97706' }, // Amber 600
  { name: '地板工程 (SPC/超耐磨)', value: 120000, color: '#b45309' }, // Amber 700
  { name: '油漆 (礦物漆/樂土)', value: 100000, color: '#a8a29e' }, // Stone 400
  { name: '水電與燈光', value: 100000, color: '#fbbf24' }, // Amber 400
  { name: '家具與軟裝', value: 250000, color: '#78716c' }, // Stone 500
  { name: '冷氣家電', value: 120000, color: '#e7e5e4' }, // Stone 200
  { name: '保護/拆除/清潔', value: 60000, color: '#57534e' }, // Stone 600
];

const materials: MaterialItem[] = [
  {
    category: "牆面與塗料",
    items: [
      { name: "樂土 / 礦物漆 (電視牆)", priceRange: "3000-5000 /坪", note: "選用米白/淺灰 (Greige) 營造手作感" },
      { name: "乳膠漆 (一般牆面)", priceRange: "1200-1800 /坪", note: "得利/立邦 霧面百合白" }
    ]
  },
  {
    category: "木作與飾面",
    items: [
      { name: "實木貼皮 (格柵/櫃體)", priceRange: "需現場報價", note: "KD板或天然栓木鋼刷" },
      { name: "系統板材 (櫃體內部)", priceRange: "E1/E0等級", note: "節省預算用於內部結構" }
    ]
  },
  {
    category: "地板",
    items: [
      { name: "SPC 石塑地板", priceRange: "2500-4500 /坪", note: "溫潤淺橡木色，防水耐磨" },
      { name: "超耐磨木地板", priceRange: "3500-6000 /坪", note: "踩踏感較佳，需注意防潮" }
    ]
  }
];

export const BudgetView: React.FC = () => {
  return (
    <div className="pb-24 px-4 pt-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-800">預算規劃 (120萬)</h2>
        <p className="text-stone-500 text-sm">17.8 坪預售屋裝潢分配建議</p>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 mb-6">
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-stone-400 font-medium">總預算</span>
            <span className="text-xl font-bold text-stone-800">120W</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {budgetData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-500">{item.name}</span>
                <span className="text-xs font-bold text-stone-700">${(item.value / 10000).toFixed(1)}萬</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material List */}
      <h3 className="text-lg font-bold text-stone-800 mb-4 px-1">材料建議清單</h3>
      <div className="space-y-4">
        {materials.map((category) => (
          <div key={category.category} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <h4 className="text-sm font-bold text-amber-800 mb-3 border-b border-stone-100 pb-2">
              {category.category}
            </h4>
            <div className="space-y-4">
              {category.items.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-medium text-stone-800">{item.name}</span>
                    <span className="text-xs font-mono text-stone-500 bg-stone-50 px-2 py-0.5 rounded">
                      {item.priceRange}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-xs text-stone-400">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
