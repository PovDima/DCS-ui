export function getTime(timeInSeconds) {
  const minutes = formatUnitOfTime(Math.floor(timeInSeconds / 60));
  const seconds = formatUnitOfTime(Math.floor(timeInSeconds % 60));

  return `${minutes}:${seconds}`;
}

export function formatUnitOfTime(unitOfTime) {
  return unitOfTime < 10 ? `0${unitOfTime}`.substring(0, 2) : unitOfTime.toString().substring(0, 2);
}
