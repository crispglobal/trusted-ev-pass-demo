import { Card } from "@/components/ui/card";
import { User, Sparkles } from "lucide-react";

interface VoiceAssistantProps {
  stage: "idle" | "listening" | "processing" | "navigating";
}

const VoiceAssistant = ({ stage }: VoiceAssistantProps) => {
  if (stage === "idle" || stage === "listening") return null;

  return (
    <Card className="bg-card border-border p-6 space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">Conversation</h3>
      
      {/* User Message */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-5 py-3 max-w-md">
          <p className="text-foreground">
            Hi Siri, find me the nearest optimal charger in Helsinki with my favorite coffee, in Denso.
          </p>
        </div>
      </div>

      {/* Assistant Response */}
      {stage === "processing" && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="bg-secondary rounded-2xl rounded-tl-sm px-5 py-4 max-w-md space-y-2">
            <p className="text-foreground leading-relaxed">
              Finding the optimal charging station…
            </p>
            <p className="text-muted-foreground text-sm">Checking battery level…</p>
            <p className="text-muted-foreground text-sm">Searching for nearby chargers with low grid load…</p>
            <p className="text-muted-foreground text-sm">Looking for your preferred coffee shop…</p>
          </div>
        </div>
      )}

      {stage === "navigating" && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="bg-secondary rounded-2xl rounded-tl-sm px-5 py-4 max-w-md space-y-3">
            <p className="text-foreground leading-relaxed">
              Found one! 🎉
            </p>
            <div className="bg-accent/10 rounded-xl p-3 space-y-1">
              <p className="text-accent font-semibold">Denso Charging Station</p>
              <p className="text-sm text-muted-foreground">📍 Helsinki, 2.3 km away</p>
              <p className="text-sm text-muted-foreground">⚡ Low grid load • Fast charging available</p>
              <p className="text-sm text-muted-foreground">☕ Your favorite coffee shop nearby</p>
            </div>
            <p className="text-foreground font-medium">Starting navigation…</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VoiceAssistant;
