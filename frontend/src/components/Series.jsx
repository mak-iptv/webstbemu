import React, { useState } from 'react';
import { mockSeries } from '../mock';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Play, Search, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const Series = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSeries, setExpandedSeries] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});
  const navigate = useNavigate();

  const filteredSeries = mockSeries.filter(series =>
    series.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSeries = (seriesId) => {
    setExpandedSeries(expandedSeries === seriesId ? null : seriesId);
  };

  const toggleSeason = (seriesId, season) => {
    const key = `${seriesId}-${season}`;
    setExpandedSeasons(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const playEpisode = (series, season, episode) => {
    navigate('/player', { 
      state: { 
        content: { 
          ...episode, 
          name: `${series.name} - S${season}E${episode.episode}`,
          description: series.description,
          stream_url: episode.stream_url
        }, 
        type: 'series' 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search series..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 h-12 rounded-xl focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Series List */}
      <div className="space-y-4">
        {filteredSeries.map(series => (
          <Card 
            key={series.id} 
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden"
          >
            <CardContent className="p-0">
              <div 
                className="flex gap-4 p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => toggleSeries(series.id)}
              >
                {/* Poster */}
                <div className="relative w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden group">
                  <img 
                    src={series.poster} 
                    alt={series.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">{series.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{series.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                        <span>{series.year}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">{series.genre}</span>
                        <span>•</span>
                        <span>{series.seasons.length} Season{series.seasons.length > 1 ? 's' : ''}</span>
                      </div>
                      <p className="text-slate-300 text-sm line-clamp-2">{series.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white"
                    >
                      {expandedSeries === series.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Seasons & Episodes */}
              {expandedSeries === series.id && (
                <div className="border-t border-slate-700 bg-slate-800/30">
                  {series.seasons.map(season => {
                    const seasonKey = `${series.id}-${season.season}`;
                    const isSeasonExpanded = expandedSeasons[seasonKey];

                    return (
                      <div key={season.season} className="border-b border-slate-700 last:border-b-0">
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                          onClick={() => toggleSeason(series.id, season.season)}
                        >
                          <h4 className="text-white font-semibold">
                            Season {season.season} 
                            <span className="text-slate-400 text-sm ml-2">({season.episodes.length} episodes)</span>
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-white"
                          >
                            {isSeasonExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </div>

                        {isSeasonExpanded && (
                          <div className="px-4 pb-4 space-y-2">
                            {season.episodes.map(episode => (
                              <div
                                key={episode.episode}
                                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group cursor-pointer"
                                onClick={() => playEpisode(series, season.season, episode)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-slate-600/50 rounded-lg flex items-center justify-center text-slate-300 font-semibold group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    {episode.episode}
                                  </div>
                                  <div>
                                    <p className="text-white font-medium">{episode.name}</p>
                                    <p className="text-slate-400 text-sm">{episode.duration}</p>
                                  </div>
                                </div>
                                <Button
                                  size="icon"
                                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Play className="w-4 h-4 fill-white" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSeries.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No series found</p>
        </div>
      )}
    </div>
  );
};

export default Series;
