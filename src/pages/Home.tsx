import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, MapPin } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-primary animate-pulse-glow" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Trusted EV Pass
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            App-Free CarPlay Charging Assistant Demo
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-primary font-medium">
            <span>DID</span>
            <span className="text-muted-foreground">•</span>
            <span>VC</span>
            <span className="text-muted-foreground">•</span>
            <span>VP</span>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Scenario 1 */}
          <Card className="bg-card border-border overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group">
            <div className="p-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Scenario 1
                </h2>
                <h3 className="text-lg font-semibold text-primary">
                  Voice Command
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  "Hi Siri, find me the nearest optimal charger with my favorite coffee."
                </p>
              </div>
              <Button
                onClick={() => navigate("/scenario1")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl"
              >
                Start Demo
              </Button>
            </div>
          </Card>

          {/* Scenario 2 */}
          <Card className="bg-card border-border overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group">
            <div className="p-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Scenario 2
                </h2>
                <h3 className="text-lg font-semibold text-accent">
                  Arrival & Auto Charging
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Automatic VP verification, charger unlock, and charging session start.
                </p>
              </div>
              <Button
                onClick={() => navigate("/scenario2")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-xl"
              >
                Start Demo
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 pt-8">
          <p className="text-sm text-muted-foreground">
            Powered by DID Gateway • Verifiable Credentials • Verifiable Presentations
          </p>
          <p className="text-xs text-muted-foreground/60">
            Trusted EV Pass Prototype • Hackathon Demo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
