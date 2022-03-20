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

export const formatDisplayAmount = (amount, limit) => {
  var prefix = "";
  var newAmount = 0;
  switch (limit) {
    case 8:
      newAmount = Math.floor(amount / 10000000);
      prefix = "Cr";
      break;
    case 7:
      newAmount = Math.floor(amount / 100000);
      prefix = "L";
      break;
    case 6:
      newAmount = Math.floor(amount / 100000);
      prefix = "L";
      break;
    case 5:
      newAmount = Math.floor(amount / 1000);
      prefix = "K";
      break;
  }
  if (newAmount > 0) {
    return newAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + prefix;
  } else return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
