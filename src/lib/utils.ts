import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buildingNames: Record<string, string> = {
  "1": "2",
  "2": "81 ปี",
  "3": "60 ปี",
  "4": "ตึกเฉลิมพระเกียรติฯ 72 พรรษา",
  "6": "55 ปี",
  "8": "คุณหญิงหรั่งฯ",
  "9": "9",
};

const building1 = [3, 4, 5];
const artBuilding = [6, 7, 8];

export function getBuildingName(room: string) {
  // if building is two digits and the first digit is 3,4,5 then it is building 1

  if (room.length === 2 && building1.includes(parseInt(room[0]))) {
    return "1";
  }

  if (room.length === 2 && artBuilding.includes(parseInt(room[0]))) {
    return "ศิลปะ";
  }

  return buildingNames[room[0]];
}

export function removeParenthesisPrefix(str: string) {
  const firstParenthesis = str.indexOf("(");

  return firstParenthesis === -1 ? str : str.slice(0, firstParenthesis).trim();
}
