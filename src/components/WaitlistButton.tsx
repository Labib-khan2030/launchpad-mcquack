import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./WaitlistForm";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

export const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [latestUsernames, setLatestUsernames] = useState<string[]>([]);

  const fetchCount = async () => {
    const { count: waitlistCount, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (!error && waitlistCount !== null) {
      setCount(waitlistCount);
    }
  };

  const fetchLatestUsernames = async () => {
    const { data, error } = await supabase
      .from("waitlist")
      .select("username")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setLatestUsernames(data.map((row) => row.username));
    }
  };

  useEffect(() => {
    fetchCount();
    fetchLatestUsernames();

    // Subscribe to changes
    const channel = supabase
      .channel("waitlist-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "waitlist",
        },
        () => {
          fetchCount();
          fetchLatestUsernames();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSuccess = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-slate-900 text-white hover:bg-slate-800 font-medium text-base px-8 h-12 rounded-full transition-all hover:scale-[1.02] border border-blue-500/50"
        >
          Join Waitlist
        </Button>
        {count > 0 && (
          <div className="text-gray-400 text-sm">
            <span className="text-white font-semibold">{count}</span> joined so far
          </div>
        )}
        {latestUsernames.length > 0 && (
          <div className="mt-2 w-full max-w-md">
            <p className="text-xs text-gray-400 mb-1 text-center">Latest usernames</p>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg max-h-32 overflow-y-auto p-2">
              <ul className="space-y-1">
                {latestUsernames.map((username, idx) => (
                  <li key={idx} className="text-xs text-slate-200 truncate text-center">
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background border-border rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground text-2xl font-bold">Join the Waitlist</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Be the first to know when we launch. Enter your details below.
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};
