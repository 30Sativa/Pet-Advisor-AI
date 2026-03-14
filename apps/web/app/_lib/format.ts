export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
