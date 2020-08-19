type Props = {
  openHour: string
  closeHour: string
  currentHour: string
}

export function isCurrentTimeWithinTimeRange(props: Props): boolean {
  const { openHour, closeHour, currentHour } = props;
  return openHour < currentHour && currentHour < closeHour; 
}