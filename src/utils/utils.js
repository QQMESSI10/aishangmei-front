import { Message } from "element-ui";
import axios from "axios";
export function errHandle(err) {
  Message.error("未知原因错误，请联系管理员处理！");
  console.log(err);
  axios.post("http://192.168.28.7:8888/front/error", { err });
}

export function getDate() {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const date = nowDate.getDate();
  const hour = nowDate.getHours();
  const minutes =
    nowDate.getMinutes() < 10
      ? "0" + nowDate.getMinutes()
      : nowDate.getMinutes();
  return `${year}-${month}-${date} ${hour}:${minutes}`;
}
