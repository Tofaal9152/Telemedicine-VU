"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PencilIcon } from "lucide-react";
import EditAgentForm from "./EditAgentForm";

const EditAgent = ({ agentId }: { agentId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-black dark:text-gray-400"
          size="sm"
        >
          <PencilIcon className="w-4 h-4 mr-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
          <DialogDescription>
            Update the agent&apos;s information below. Make sure to fill in all
            the
          </DialogDescription>
          <EditAgentForm agentId={agentId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditAgent;
