"use client";

export default function MainLayoutCom({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto lg:mt-8 px-4 z-10">
      <div className="animate-fade-in-up">{children}</div>
    </div>
  );
}
