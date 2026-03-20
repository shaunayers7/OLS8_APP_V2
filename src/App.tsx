import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Lists from './pages/Lists';
import Ops from './pages/Ops';
import Team from './pages/Team';
import Ref from './pages/Ref';
import { useProfile } from './hooks/useProfile';

export default function App() {
  const { profile, completeOnboarding } = useProfile();

  if (!profile.onboarded) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return (
    <HashRouter>
      <div className="app-shell">
        <main className="main-content">
          <Routes>
            <Route path="/"      element={<Dashboard />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/ops"   element={<Ops />} />
            <Route path="/team"  element={<Team />} />
            <Route path="/ref"   element={<Ref />} />
            <Route path="*"      element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
