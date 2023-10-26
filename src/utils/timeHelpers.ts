import intervalToDuration from "date-fns/intervalToDuration";
import minutesToSeconds from "date-fns/minutesToSeconds";
import formatDuration from "date-fns/formatDuration";
import format from "date-fns/format";

export const formatDate = (date: string): string => {
  if (!date) return "Nenhuma data";
  return format(new Date(date), "dd/MM/yyyy");
};

export const formatPeriod = (minutes: number): string => {
  if (!minutes) return "Nenhuma duração";

  const timerObject = intervalToDuration({
    start: 0,
    end: minutesToSeconds(Number(minutes)) * 1000,
  });

  const duration = formatDuration(timerObject);
  const replacedString = duration
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("minutes", "m");

  return replacedString;
};
