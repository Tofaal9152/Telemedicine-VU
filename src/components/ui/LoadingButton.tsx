"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <Loader className="animate-spin w-4 h-4 mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
