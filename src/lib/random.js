/**
 * generateRandom string
 * @param length {number}
 * @param onlyNumbers {boolean}
 * @returns {string}
 */
const generateRandom = (length = 12, onlyNumbers = false) => {
  let result = "";
  let characters = "0123456789";
  if (!onlyNumbers) {
    characters +=
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `a${result}`;
};

export default generateRandom;
