import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, CreditCard, Car, User } from "lucide-react";

interface VerificationFlowProps {
  stage: "verifying" | "verified";
}

const VerificationFlow = ({ stage }: VerificationFlowProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Verification Card */}
      <Card className="bg-card border-border p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            stage === "verifying" 
              ? "bg-primary/10 animate-pulse-glow" 
              : "bg-accent/10"
          }`}>
            <Shield className={`w-8 h-8 ${
              stage === "verifying" ? "text-primary" : "text-accent"
            }`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {stage === "verifying" ? "Verifying Identity..." : "Identity Verified"}
            </h2>
            <p className="text-muted-foreground">Via Verifiable Presentation (VP)</p>
          </div>
        </div>

        {/* Credential Checks */}
        <div className="space-y-3">
          <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 ${
            stage === "verifying" 
              ? "bg-muted animate-pulse" 
              : "bg-accent/10"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              stage === "verifying" ? "bg-primary/20" : "bg-accent/20"
            }`}>
              {stage === "verifying" ? (
                <User className="w-5 h-5 text-primary" />
              ) : (
                <CheckCircle className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Driver VC</p>
              <p className="text-sm text-muted-foreground">
                {stage === "verifying" ? "Checking..." : "Verified"}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 delay-150 ${
            stage === "verifying" 
              ? "bg-muted animate-pulse" 
              : "bg-accent/10"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              stage === "verifying" ? "bg-primary/20" : "bg-accent/20"
            }`}>
              {stage === "verifying" ? (
                <Car className="w-5 h-5 text-primary" />
              ) : (
                <CheckCircle className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Vehicle VC</p>
              <p className="text-sm text-muted-foreground">
                {stage === "verifying" ? "Checking..." : "Verified"}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 delay-300 ${
            stage === "verifying" 
              ? "bg-muted animate-pulse" 
              : "bg-accent/10"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              stage === "verifying" ? "bg-primary/20" : "bg-accent/20"
            }`}>
              {stage === "verifying" ? (
                <CreditCard className="w-5 h-5 text-primary" />
              ) : (
                <CheckCircle className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Payment VC</p>
              <p className="text-sm text-muted-foreground">
                {stage === "verifying" ? "Checking..." : "Verified"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Success Card */}
      {stage === "verified" && (
        <Card className="bg-accent/10 border-accent p-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-accent" />
            <div>
              <h3 className="text-xl font-bold text-foreground">Charger Unlocked</h3>
              <p className="text-muted-foreground">You can now plug in your vehicle</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VerificationFlow;
