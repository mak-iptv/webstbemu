import React, { useState } from 'react';
import { mockMovies, movieGenres } from '../mock';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Play, Search, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredMovies = mockMovies.filter(movie => {
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const playMovie = (movie) => {
    navigate('/player', { state: { content: movie, type: 'movie' } });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 h-12 rounded-xl focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Genre Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {movieGenres.map(genre => (
          <Button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            variant="outline"
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMovies.map(movie => (
          <Card 
            key={movie.id} 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            onClick={() => playMovie(movie)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3]">
                <img 
                  src={movie.poster} 
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-blue-500/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Rating badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-white">{movie.rating}</span>
                </div>

                {/* Year badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-medium text-white">{movie.year}</span>
                </div>

                {/* Info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{movie.duration}</span>
                    <span className="ml-auto px-2 py-0.5 bg-blue-500/80 rounded text-white font-medium">{movie.genre}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                  {movie.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{movie.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No movies found</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
