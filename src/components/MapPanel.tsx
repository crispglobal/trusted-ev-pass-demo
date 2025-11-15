import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Coffee, Zap } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapPanelProps {
  stage: "idle" | "listening" | "processing" | "navigating";
}

// Mock EV charging stations in Helsinki
const evStations = [
  { id: 1, name: "Denso Charging Station", coords: [24.9458, 60.1695], hasCoffee: true, selected: true },
  { id: 2, name: "K-Lataus Kamppi", coords: [24.9320, 60.1680], hasCoffee: false, selected: false },
  { id: 3, name: "ABC Lataus", coords: [24.9650, 60.1750], hasCoffee: true, selected: false },
  { id: 4, name: "Virta Charging Hub", coords: [24.9200, 60.1620], hasCoffee: false, selected: false },
];

const MapPanel = ({ stage }: MapPanelProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [24.9458, 60.1695], // Helsinki center
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add EV station markers
    evStations.forEach((station) => {
      const el = document.createElement("div");
      el.className = "ev-marker";
      el.style.width = station.selected ? "40px" : "30px";
      el.style.height = station.selected ? "40px" : "30px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = station.selected ? "hsl(var(--accent))" : "hsl(var(--primary))";
      el.style.border = "3px solid hsl(var(--background))";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.boxShadow = station.selected ? "0 0 20px hsl(var(--accent))" : "0 0 10px hsl(var(--primary))";
      
      const icon = document.createElement("div");
      icon.innerHTML = "⚡";
      icon.style.fontSize = station.selected ? "20px" : "16px";
      el.appendChild(icon);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(station.coords as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="color: hsl(var(--foreground)); padding: 4px;">
                <strong>${station.name}</strong><br/>
                ${station.hasCoffee ? "☕ Coffee available" : "No coffee"}
              </div>
            `)
        )
        .addTo(map.current);

      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  // Animate to selected station when navigating
  useEffect(() => {
    if (stage === "navigating" && map.current) {
      const selectedStation = evStations.find(s => s.selected);
      if (selectedStation) {
        map.current.flyTo({
          center: selectedStation.coords as [number, number],
          zoom: 14,
          duration: 2000,
        });
      }
    }
  }, [stage]);

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
      <div className="relative h-96 bg-gradient-to-br from-muted to-secondary">
        {!tokenSubmitted ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 z-10 bg-card/95 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-4">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">Enter Mapbox Token</h3>
                <p className="text-sm text-muted-foreground">
                  Get your free token at{" "}
                  <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    mapbox.com
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="bg-background border-border"
                />
                <Button
                  onClick={() => setTokenSubmitted(true)}
                  disabled={!mapboxToken}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Load Map
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div ref={mapContainer} className="absolute inset-0" />

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
        )}
      </div>
    </Card>
  );
};

export default MapPanel;
