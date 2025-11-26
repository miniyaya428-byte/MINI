import React from 'react';
import { Home, Eye,  LayoutDashboard, Wallet } from 'lucide-react';
import { AppTab } from '../types';

interface NavBarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentTab, onTabChange }) => {
  const getIconClass = (tab: AppTab) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      currentTab === tab ? 'text-amber-700' : 'text-stone-400 hover:text-stone-600'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-stone-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto h-full flex justify-between items-center px-6">
        <button onClick={() => onTabChange(AppTab.HOME)} className={getIconClass(AppTab.HOME)}>
          <Home size={24} strokeWidth={currentTab === AppTab.HOME ? 2.5 : 2} />
          <span className="text-[10px] font-medium">總覽</span>
        </button>
        <button onClick={() => onTabChange(AppTab.CONCEPT)} className={getIconClass(AppTab.CONCEPT)}>
          <LayoutDashboard size={24} strokeWidth={currentTab === AppTab.CONCEPT ? 2.5 : 2} />
          <span className="text-[10px] font-medium">設計概念</span>
        </button>
        <button onClick={() => onTabChange(AppTab.VISUALIZER)} className={getIconClass(AppTab.VISUALIZER)}>
          <Eye size={24} strokeWidth={currentTab === AppTab.VISUALIZER ? 2.5 : 2} />
          <span className="text-[10px] font-medium">AI 模擬</span>
        </button>
        <button onClick={() => onTabChange(AppTab.BUDGET)} className={getIconClass(AppTab.BUDGET)}>
          <Wallet size={24} strokeWidth={currentTab === AppTab.BUDGET ? 2.5 : 2} />
          <span className="text-[10px] font-medium">預算與清單</span>
        </button>
      </div>
    </nav>
  );
};
