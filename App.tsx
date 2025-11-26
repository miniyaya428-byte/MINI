import React, { useState } from 'react';
import { AppTab } from './types';
import { NavBar } from './components/NavBar';
import { HomeView } from './components/HomeView';
import { DesignConceptView } from './components/DesignConceptView';
import { VisualizerView } from './components/VisualizerView';
import { BudgetView } from './components/BudgetView';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.HOME:
        return <HomeView onNavigate={setCurrentTab} />;
      case AppTab.CONCEPT:
        return <DesignConceptView />;
      case AppTab.VISUALIZER:
        return <VisualizerView />;
      case AppTab.BUDGET:
        return <BudgetView />;
      default:
        return <HomeView onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <main className="h-full">
        {renderContent()}
      </main>
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;