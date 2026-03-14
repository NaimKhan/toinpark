"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function Toast() {
  const { toast } = useToast();

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        onClick={() =>
          toast({
            title: "Action Successfully Completed",
            description: "Your process has been completed successfully.",
            variant: "success"
          })
        }
      >
        Click me
      </Button>
    </div>
  );
}

export default Toast;
