import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl font-bold ">Page Not Found</h1>
      <p className="text-lg ">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
