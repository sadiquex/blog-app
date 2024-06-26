export const formatCreatedAt = (createdAt: {
  seconds: number;
  nanoseconds: number;
}) => {
  const date = new Date(createdAt?.seconds * 1000);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};
