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

  const fetchCount = async () => {
    const { count: waitlistCount, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (!error && waitlistCount !== null) {
      setCount(waitlistCount);
    }
  };

  useEffect(() => {
    fetchCount();

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
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6"
        >
          <Users className="mr-2 h-5 w-5" />
          Join Waitlist
        </Button>
        <div className="text-muted-foreground text-sm font-medium">
          <span className="text-foreground font-bold text-lg">{count}</span> joined so far
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-2xl">Join the Waitlist</DialogTitle>
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
