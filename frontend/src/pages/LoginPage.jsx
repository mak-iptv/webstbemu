import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tv, Shield } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const LoginPage = ({ onLogin }) => {
  const [portalUrl, setPortalUrl] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateRandomMAC = () => {
    const mac = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });
    setMacAddress(mac);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!portalUrl) {
      toast({
        title: "Error",
        description: "Please enter portal URL",
        variant: "destructive"
      });
      return;
    }

    if (!macAddress) {
      toast({
        title: "Error",
        description: "Please enter or generate MAC address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const credentials = { portalUrl, macAddress };
      localStorage.setItem('stb_credentials', JSON.stringify(credentials));
      onLogin(credentials);
      toast({
        title: "Success",
        description: "Connected to portal successfully"
      });
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-slate-800/50 backdrop-blur-xl border-slate-700 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Tv className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">STB EMU Player</CardTitle>
          <CardDescription className="text-slate-300">Enter your portal credentials to connect</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="portal" className="text-slate-200">Portal URL</Label>
              <Input
                id="portal"
                type="url"
                placeholder="http://portal.example.com"
                value={portalUrl}
                onChange={(e) => setPortalUrl(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mac" className="text-slate-200">MAC Address</Label>
              <div className="flex gap-2">
                <Input
                  id="mac"
                  type="text"
                  placeholder="00:1A:79:XX:XX:XX"
                  value={macAddress}
                  onChange={(e) => setMacAddress(e.target.value.toUpperCase())}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateRandomMAC}
                  className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
                >
                  <Shield className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400">Click shield icon to generate random MAC</p>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20"
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Connect to Portal'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
