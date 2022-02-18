export default function GetCompleteDate(activeDate) {
  var date = activeDate.getDate();
  var month = activeDate.getMonth() + 1;
  var year = activeDate.getFullYear();
  // console.log(activeDate);
  return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
}

export function FormatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}