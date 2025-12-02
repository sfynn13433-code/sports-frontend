import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bell } from "lucide-react";

interface ComingSoonModalProps {
  open: boolean;
  sportName: string;
  onNotifyMe: () => void;
  onClose: () => void;
}

export function ComingSoonModal({
  open,
  sportName,
  onNotifyMe,
  onClose,
}: ComingSoonModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gradient-to-br from-slate-900 to-slate-950 border-gold-700/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-white">
            Predictions Coming Soon
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 mt-4 space-y-4">
            <p>
              Predictions for <span className="font-semibold text-gold-300">{sportName}</span> are coming soon. Notify me when available.
            </p>
            <div className="p-4 rounded-lg bg-gold-950/30 border border-gold-500/20">
              <p className="text-sm text-gold-200">
                <span className="font-semibold">📋 What to expect:</span> Once live, predictions will be presented in a friendly, confident tone, with clear explanations of our analysis without guaranteeing results. You'll receive insights based on real-time data and AI-powered pattern recognition.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialogCancel className="bg-slate-800 hover:bg-slate-700 border-slate-600 text-white">
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onNotifyMe}
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 font-semibold flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notify Me
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
