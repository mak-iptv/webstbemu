import React, { useState } from 'react';
import { mockChannels, mockEPG } from '../mock';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Search, Clock, Tv } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const EPG = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);

  const filteredChannels = mockChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const channelPrograms = mockEPG[selectedChannel?.epg_id] || [];

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

      <div className="grid md:grid-cols-3 gap-6">
        {/* Channel List */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm md:col-span-1">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Tv className="w-5 h-5" />
              Channels
            </h3>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-2">
                {filteredChannels.map(channel => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedChannel?.id === channel.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                  >
                    <img 
                      src={channel.logo} 
                      alt={channel.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{channel.name}</p>
                      <p className="text-slate-400 text-xs">{channel.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Program Guide */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm md:col-span-2">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Program Guide
              </h3>
              {selectedChannel && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <img 
                    src={selectedChannel.logo} 
                    alt={selectedChannel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-lg">{selectedChannel.name}</p>
                    <p className="text-slate-400 text-sm">{selectedChannel.category}</p>
                  </div>
                </div>
              )}
            </div>

            <ScrollArea className="h-[550px]">
              {channelPrograms.length > 0 ? (
                <div className="space-y-3 pr-4">
                  {channelPrograms.map((program, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex flex-col items-center justify-center text-white shadow-lg shadow-blue-500/20">
                          <span className="text-lg font-bold">{program.time.split(':')[0]}</span>
                          <span className="text-xs">{program.time.split(':')[1]}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{program.title}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{program.time} - {program.duration}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                          {index === 0 ? 'Live Now' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <Clock className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400 text-lg">No program guide available</p>
                  <p className="text-slate-500 text-sm mt-2">EPG data not available for this channel</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EPG;
