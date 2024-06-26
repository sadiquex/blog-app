export const formatCreatedAt = (createdAt: {
  seconds: number;
  nanoseconds: number;
}) => {
  const date = new Date(createdAt?.seconds * 1000);
  return date.toLocaleString();
};
