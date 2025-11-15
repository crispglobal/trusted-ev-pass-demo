import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Coffee, Zap } from "lucide-react";

interface MapPanelProps {
  stage: "idle" | "listening" | "processing" | "navigating";
}

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

      {/* Map Placeholder */}
      <div className="relative h-96 bg-gradient-to-br from-muted to-secondary">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Map Content */}
        <div className="relative h-full flex items-center justify-center p-8">
          {stage === "idle" || stage === "listening" ? (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Waiting for voice command...</p>
            </div>
          ) : stage === "processing" ? (
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
          ) : (
            <div className="w-full space-y-4 animate-fade-in">
              {/* Charger Pin */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <MapPin className="w-12 h-12 text-accent drop-shadow-lg animate-bounce-subtle" fill="currentColor" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent/30 blur-sm" />
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <Card className="bg-card/95 backdrop-blur-sm border-accent p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        Denso Charging Station
                      </h3>
                      <p className="text-sm text-muted-foreground">Mannerheimintie 12, Helsinki</p>
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
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MapPanel;
