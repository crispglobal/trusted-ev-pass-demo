import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mic, MapPin, Coffee, Battery, Zap } from "lucide-react";
import VoiceAssistant from "@/components/VoiceAssistant";
import MapPanel from "@/components/MapPanel";
import Notification from "@/components/Notification";

const Scenario1 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"idle" | "listening" | "processing" | "navigating">("idle");
  const [showNotification, setShowNotification] = useState(false);

  const handleVoiceCommand = () => {
    setStage("listening");
    
    setTimeout(() => {
      setStage("processing");
    }, 1500);

    setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    setTimeout(() => {
      setShowNotification(false);
      setStage("navigating");
    }, 5000);
  };

  const handleReset = () => {
    setStage("idle");
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Notification */}
      <Notification 
        show={showNotification}
        message="Optimal charger found! Starting navigation..."
        icon={<MapPin className="w-5 h-5" />}
      />

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-foreground">Scenario 1: Voice Command</h1>
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-border text-foreground"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Voice Assistant */}
        <div className="space-y-6">
          {/* Voice Control Card */}
          <Card className="bg-card border-border p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Voice Assistant</h2>
                <p className="text-sm text-muted-foreground">CarPlay Integration</p>
              </div>
            </div>

            {stage === "idle" && (
              <Button
                onClick={handleVoiceCommand}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-8 text-lg rounded-xl"
              >
                <Mic className="w-6 h-6 mr-3" />
                Simulate Voice Command
              </Button>
            )}

            {stage === "listening" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                  <Mic className="w-12 h-12 text-primary" />
                </div>
                <p className="text-lg font-medium text-primary">Listening...</p>
              </div>
            )}
          </Card>

          {/* Voice Conversation */}
          <VoiceAssistant stage={stage} />

          {/* Vehicle Status */}
          {stage !== "idle" && (
            <Card className="bg-secondary border-border p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Battery Level</span>
                  </div>
                  <span className="text-foreground font-semibold">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-warning" />
                    <span className="text-muted-foreground">Range</span>
                  </div>
                  <span className="text-foreground font-semibold">89 km</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Panel - Map */}
        <MapPanel stage={stage} />
      </div>
    </div>
  );
};

export default Scenario1;
