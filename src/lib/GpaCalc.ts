export function GpaCalc(degree: number) {
  let gpaPoint = 0;
  let letter = "";

  if (degree >= 90) {
    gpaPoint = 4.0;
    letter = "A";
  } else if (degree >= 85) {
    gpaPoint = 3.5;
    letter = "B+";
  } else if (degree >= 80) {
    gpaPoint = 3.0;
    letter = "B";
  } else if (degree >= 75) {
    gpaPoint = 2.5;
    letter = "C+";
  } else if (degree >= 70) {
    gpaPoint = 2.0;
    letter = "C";
  } else if (degree >= 65) {
    gpaPoint = 1.5;
    letter = "D+";
  } else if (degree >= 60) {
    gpaPoint = 1.0;
    letter = "D";
  } else {
    gpaPoint = 0.0;
    letter = "F";
  }

  return {
    gpa: gpaPoint,
    letter,
  };
}
