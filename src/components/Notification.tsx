import { Card } from "@/components/ui/card";

interface NotificationProps {
  show: boolean;
  message: string;
  icon?: React.ReactNode;
}

const Notification = ({ show, message, icon }: NotificationProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <Card className="bg-card/95 backdrop-blur-sm border-primary shadow-glow px-6 py-4 min-w-96">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <p className="text-foreground font-medium">{message}</p>
        </div>
      </Card>
    </div>
  );
};

export default Notification;
