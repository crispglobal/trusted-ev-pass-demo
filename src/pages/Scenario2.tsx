import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Zap, Coffee, FileCheck, Clock, Euro, Leaf } from "lucide-react";
import Notification from "@/components/Notification";
import VerificationFlow from "@/components/VerificationFlow";

const Scenario2 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"idle" | "arriving" | "verifying" | "verified" | "charging" | "complete">("idle");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationIcon, setNotificationIcon] = useState<React.ReactNode>(null);

  const handleArrival = () => {
    setStage("arriving");
    setNotificationMessage("Detecting vehicle arrival...");
    setNotificationIcon(<Zap className="w-5 h-5" />);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      setStage("verifying");
    }, 2000);

    setTimeout(() => {
      setNotificationMessage("Verifying your identity via VP...");
      setNotificationIcon(<Shield className="w-5 h-5" />);
      setShowNotification(true);
    }, 2500);

    setTimeout(() => {
      setShowNotification(false);
      setStage("verified");
    }, 5000);

    setTimeout(() => {
      setNotificationMessage("Charger unlocked! Charging started.");
      setNotificationIcon(<Zap className="w-5 h-5 text-accent" />);
      setShowNotification(true);
    }, 5500);

    setTimeout(() => {
      setShowNotification(false);
      setStage("charging");
    }, 7500);

    setTimeout(() => {
      setNotificationMessage("Your favorite coffee will be ready in 5 minutes ☕");
      setNotificationIcon(<Coffee className="w-5 h-5 text-warning" />);
      setShowNotification(true);
    }, 8000);

    setTimeout(() => {
      setShowNotification(false);
      setStage("complete");
    }, 10000);
  };

  const handleReset = () => {
    setStage("idle");
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Notification */}
      <Notification 
        show={showNotification}
        message={notificationMessage}
        icon={notificationIcon}
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
          <h1 className="text-xl font-bold text-foreground">Scenario 2: Arrival & Auto Charging</h1>
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
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Start Button */}
        {stage === "idle" && (
          <Card className="bg-card border-border p-8 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-accent" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Ready to Simulate Arrival</h2>
              <p className="text-muted-foreground">
                This will demonstrate automatic VP verification and charging session start
              </p>
            </div>
            <Button
              onClick={handleArrival}
              className="w-full max-w-md mx-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-8 text-lg rounded-xl"
            >
              Simulate Arrival & Plug-In
            </Button>
          </Card>
        )}

        {/* Verification Flow */}
        {(stage === "verifying" || stage === "verified") && (
          <VerificationFlow stage={stage} />
        )}

        {/* Charging Started Card */}
        {(stage === "charging" || stage === "complete") && (
          <Card className="bg-gradient-success border-accent p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent-foreground/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-accent-foreground animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-accent-foreground">Charging Started</h2>
                <p className="text-accent-foreground/80">Automatic authentication successful</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent-foreground/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-foreground/80 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Estimated Time</span>
                </div>
                <p className="text-2xl font-bold text-accent-foreground">15 min</p>
              </div>
              <div className="bg-accent-foreground/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-foreground/80 mb-2">
                  <Euro className="w-4 h-4" />
                  <span className="text-sm">Estimated Cost</span>
                </div>
                <p className="text-2xl font-bold text-accent-foreground">€7.00</p>
              </div>
              <div className="bg-accent-foreground/10 rounded-xl p-4 col-span-2">
                <div className="flex items-center gap-2 text-accent-foreground/80 mb-2">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">Energy Mix</span>
                </div>
                <p className="text-2xl font-bold text-accent-foreground">62% Green Energy</p>
              </div>
            </div>

            <div className="bg-accent-foreground/10 rounded-xl p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent-foreground" />
              <span className="text-sm text-accent-foreground font-medium">
                Powered by Verifiable Presentation (VP)
              </span>
            </div>
          </Card>
        )}

        {/* Charging Session VC Card */}
        {stage === "complete" && (
          <Card className="bg-card border-border p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Charging Session VC Issued</h2>
                <p className="text-muted-foreground">Verifiable credential for this charging session</p>
              </div>
            </div>

            <div className="space-y-3 bg-secondary rounded-xl p-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Energy Delivered</span>
                <span className="text-foreground font-semibold">12.4 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="text-foreground font-semibold">€7.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Session Duration</span>
                <span className="text-foreground font-semibold">15 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Footprint</span>
                <span className="text-accent font-semibold">-2.1 kg</span>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Credential stored securely in your DID wallet</p>
                <p className="text-muted-foreground text-xs mt-1">Verified by DID Gateway</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Scenario2;
