// string
const anonymous: string = "stranger";
console.log(`Hello ${anonymous}!`);

// number
const a: number = 1;
const b: number = 2;
const sum: number = a + b;
console.log(sum, typeof sum);

// boolean
const yourAnswer: boolean = false;
const isFalse = (answer: boolean) => {
  if (answer === true) {
    return "TRUE";
  } else {
    return "FALSE";
  }
};
console.log(isFalse(yourAnswer));

// null
let order: string | null = null;

if (order === null) {
  console.log("주문이 없습니다.");
} else {
  console.log(`주문하신 식사는 ${order}입니다.`);
}

// any
const anyValue: any[] = ["oz", 2, true];
console.log(`배열 안에 있는 것들 : ${anyValue.map((i) => i)}`);
