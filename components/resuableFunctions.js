import GetCompleteDate from "./getCompletDate";
import { FormatAMPM } from "./getCompletDate";

export const formatLastUpdatedTime = (seconds) => {
  var lastUpDate = new Date(seconds * 1000);
  var currentDate = new Date();

  if (currentDate.getDate() == lastUpDate.getDate()) {
    return FormatAMPM(lastUpDate);
  } else if (currentDate.getDate() - 1 == lastUpDate.getDate()) {
    return "yesterday";
  } else return GetCompleteDate(lastUpDate);
};
