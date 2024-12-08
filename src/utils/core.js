import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";  
import utc from "dayjs/plugin/utc"; 

dayjs.extend(utc);
dayjs.extend(timezone);

const adjustDateTimeForTimezone = (dateString) => {
  if (!dateString) return new Date();
  const dateUTC = dayjs.utc(dateString);
  const dateInUTCMinus = dateUTC.tz("America/Sao_Paulo");

  return dayjs(dateInUTCMinus.format());
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  return dayjs.utc(dateString).tz("America/Sao_Paulo").format("DD/MM - HH:mm");
};

const getUser = () => {
  const user = localStorage.getItem("session");
  if (user) {
    return JSON.parse(user).user;
  }
  return null;
};

const handleChange = (data, setData, value, field) => {
  const d = data;
  d[field].value = value;
  setData(() => ({
    ...d,
  }));
};

const calculateDuration = (startTimeStr, type) => {
  const startTime = dayjs.utc(startTimeStr);
  const endTime = dayjs().startOf("day");

  if (type === "day") {
    return dayjs.duration(endTime.diff(startTime)).asDays();
  } else if (type === "hour") {
    return dayjs.duration(endTime.diff(startTime)).asHours();
  } else {
    return dayjs.duration(endTime.diff(startTime)).asMinutes();
  }
};

export {
  handleChange,
  formatDate,
  adjustDateTimeForTimezone,
  getUser,
  calculateDuration,
};
