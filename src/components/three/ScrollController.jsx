export function staged(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export function staggered(progress, start, end, index, total) {
  const slice = (end - start) / Math.max(total, 1);
  return staged(progress, start + slice * index * 0.55, start + slice * (index + 1.4));
}
