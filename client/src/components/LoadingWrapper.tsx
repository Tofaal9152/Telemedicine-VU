import { Loader } from "lucide-react";

type LoadingWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  children: React.ReactNode;
};

const LoadingWrapper = ({
  isLoading,
  isError,
  error,
  children,
}: LoadingWrapperProps) => {
  if (isLoading) {
    return (
      <div className="w-full py-6 flex justify-center">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        {error instanceof Error ? error.message : String(error)}
      </p>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
