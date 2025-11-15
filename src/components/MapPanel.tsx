import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Coffee, Zap } from "lucide-react";

interface MapPanelProps {
  stage: "idle" | "listening" | "processing" | "navigating";
}

// Mock EV charging stations positioned on the static map (Kivenlahti area)
const evStations = [
  { id: 1, name: "Hybridiarena Hype", position: { top: "48%", left: "48%" }, hasCoffee: true, selected: true },
  { id: 2, name: "K-Market Kivenlahti", position: { top: "65%", left: "62%" }, hasCoffee: false, selected: false },
  { id: 3, name: "Kivenlahti Squash", position: { top: "68%", left: "75%" }, hasCoffee: true, selected: false },
  { id: 4, name: "Koirien Uimaranta", position: { top: "72%", left: "28%" }, hasCoffee: false, selected: false },
];

const MapPanel = ({ stage }: MapPanelProps) => {

  return (
    <Card className="bg-card border-border overflow-hidden h-fit lg:sticky lg:top-24">
      {/* Map Header */}
      <div className="bg-secondary border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Navigation</span>
        </div>
        {stage === "navigating" && (
          <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-medium animate-pulse">
            Active
          </span>
        )}
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-muted to-secondary overflow-hidden">
        {/* Static Map Background - Real Map Image */}
        <div className="absolute inset-0">
          <img 
            src="/mapBackground.png" 
            alt="Map of Kivenlahti area" 
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay for better contrast */}
          <div className="absolute inset-0 bg-background/5"></div>

          {/* EV Station Markers */}
          {evStations.map((station) => (
            <div
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                top: station.position.top,
                left: station.position.left,
                zIndex: station.selected ? 20 : 10,
              }}
            >
              <div
                className={`
                  rounded-full flex items-center justify-center
                  border-2 border-background cursor-pointer
                  transition-all duration-300
                  ${station.selected 
                    ? 'w-10 h-10 bg-accent shadow-[0_0_20px_hsl(var(--accent))] animate-pulse' 
                    : 'w-8 h-8 bg-primary shadow-[0_0_10px_hsl(var(--primary))] hover:scale-110'
                  }
                `}
                title={`${station.name}${station.hasCoffee ? ' - Coffee available' : ''}`}
              >
                <Zap className={`${station.selected ? 'w-5 h-5' : 'w-4 h-4'} text-background`} fill="currentColor" />
              </div>
            </div>
          ))}

          {/* Navigation Route Line (only when navigating) */}
          {stage === "navigating" && (
            <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 10% 90% Q 30% 50%, 52% 45%"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                className="animate-fade-in"
              />
            </svg>
          )}
        </div>

        {/* Overlay content based on stage */}
        {stage === "idle" || stage === "listening" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Waiting for voice command...</p>
            </div>
          </div>
        ) : stage === "processing" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse-glow">
                <Navigation className="w-10 h-10 text-primary" />
              </div>
              <p className="text-foreground font-medium">Searching for optimal charger...</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-6 left-6 right-6 animate-fade-in pointer-events-auto">
            <Card className="bg-card/95 backdrop-blur-sm border-accent p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Hybridiarena Hype
                  </h3>
                  <p className="text-sm text-muted-foreground">Höyrylaivantie, Kivenlahti</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">2.3 km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-warning" />
                  <span className="text-muted-foreground">Coffee available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Low grid load</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Fast charging</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Navigating...</span>
                  <span className="text-sm text-muted-foreground ml-auto">~5 min</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapPanel;
