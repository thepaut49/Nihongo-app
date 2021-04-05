export const newMeaningNumber = (list) => {
  let max = 0;
  if (list && list.length > 1) {
    max = list.reduce((meaning1, meaning2) =>
      meaning1.meaningNumber > meaning2.meaningNumber ? meaning1 : meaning2
    ).meaningNumber;
  } else if (list && list.length === 1) {
    max = list[0].meaningNumber;
  }
  return max + 1;
};
