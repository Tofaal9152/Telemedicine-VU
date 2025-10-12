export const formatDate = (duration: string | number | undefined): string => {
  if (!duration) return "অজানা";
  if (typeof duration === "number") {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours
      ? `${hours} ঘণ্টা${minutes ? ` ${minutes} মিনিট` : ""}`
      : `${minutes} মিনিট`;
  }
  const date = new Date(duration);
  return !isNaN(date.getTime())
    ? date.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : duration;
};