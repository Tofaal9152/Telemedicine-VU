"use client";
const error = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>

      <p className="text-lg text-red-500">Error: {error.message}</p>
      <p className="text-lg text-red-500">
        If the problem persists, contact support.
      </p>
    </div>
  );
};

export default error;
