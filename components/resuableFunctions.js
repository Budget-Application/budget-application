import GetCompleteDate from "./getCompletDate";
import { FormatAMPM } from "./getCompletDate";
import * as Notifications from "expo-notifications";
import { getUsersInBudget } from "../db/apis/budget";
import { getUserDetails } from "../db/apis/user";

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

export const sendNotificationToUsers = async (
  usersList,
  title,
  messageBody
) => {
  for (let userId in usersList) {
    let userDetailsDB = await getUserDetails(usersList[userId]);
    const message = {
      to: userDetailsDB["expoPushToken"],
      sound: "default",
      title: title,
      body: messageBody,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
};
