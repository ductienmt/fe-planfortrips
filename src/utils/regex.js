export const regexUrlIcon = (str) => {
    const regex = /url=(https?:\/\/[^\s,]+)/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return str;
    }
  };