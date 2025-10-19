import React, { useState } from 'react';
import { mockChannels, categories } from '../mock';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Play, Search, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveTV = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const filteredChannels = mockChannels.filter(channel => {
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (channelId) => {
    setFavorites(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const playChannel = (channel) => {
    navigate('/player', { state: { content: channel, type: 'live' } });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search channels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 h-12 rounded-xl focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant="outline"
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredChannels.map(channel => (
          <Card 
            key={channel.id} 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            onClick={() => playChannel(channel)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img 
                  src={channel.logo} 
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-blue-500/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(channel.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-slate-900/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors z-10"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(channel.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>

                {/* Category badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/70 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-medium text-white">{channel.category}</span>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                  {channel.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No channels found</p>
        </div>
      )}
    </div>
  );
};

export default LiveTV;
