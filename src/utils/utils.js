import { Message } from "element-ui";
import axios from "axios";
export function errHandle(err) {
  Message.error("未知原因错误，请联系管理员处理！");
  console.log(err);
  axios.post("http://localhost:8888/front/error", { err });
}

function dateTransform(val) {
  return val < 10 ? "0" + val : val;
}
export function getDate() {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const date = nowDate.getDate();
  const hour = nowDate.getHours();
  const minutes = nowDate.getMinutes();
  const seconds = nowDate.getSeconds();
  return `${year}-${dateTransform(month)}-${dateTransform(
    date
  )} ${dateTransform(hour)}:${dateTransform(minutes)}:${dateTransform(
    seconds
  )}`;
}
