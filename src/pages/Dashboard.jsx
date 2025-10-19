import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Tv, Film, TvMinimal, Calendar, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveTV from '../components/LiveTV';
import Movies from '../components/Movies';
import Series from '../components/Series';
import EPG from '../components/EPG';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('live');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('stb_credentials');
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">STB EMU Player</h1>
                <p className="text-xs text-slate-400">MAG Portal Connected</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 p-1.5 inline-flex gap-1">
            <TabsTrigger 
              value="live" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300 px-6 py-2.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Tv className="w-4 h-4" />
              Live TV
            </TabsTrigger>
            <TabsTrigger 
              value="movies" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300 px-6 py-2.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Film className="w-4 h-4" />
              Movies
            </TabsTrigger>
            <TabsTrigger 
              value="series" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300 px-6 py-2.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <TvMinimal className="w-4 h-4" />
              Series
            </TabsTrigger>
            <TabsTrigger 
              value="epg" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300 px-6 py-2.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Calendar className="w-4 h-4" />
              EPG Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-0">
            <LiveTV />
          </TabsContent>

          <TabsContent value="movies" className="mt-0">
            <Movies />
          </TabsContent>

          <TabsContent value="series" className="mt-0">
            <Series />
          </TabsContent>

          <TabsContent value="epg" className="mt-0">
            <EPG />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
