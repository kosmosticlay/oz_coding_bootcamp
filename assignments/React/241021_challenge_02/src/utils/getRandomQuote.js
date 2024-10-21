const quotes = [
  {
    quote: "작은 목표를 이루는 것이 큰 성공의 시작이다.",
    author: "존 F. 케네디",
  },
  { quote: "시간 관리는 자기 관리다.", author: "스티븐 코비" },
  { quote: "성공은 매일 해야 할 작은 일들의 결과다.", author: "짐 론" },
  { quote: "미루지 말고, 지금 시작하라.", author: "나폴레옹 힐" },
  {
    quote: "계획이 없으면 목적지에 도달할 수 없다.",
    author: "벤저민 프랭클린",
  },
  { quote: "성공은 준비와 기회의 만남이다.", author: "보비 언서" },
  {
    quote: "행동은 두려움을 이기는 가장 강력한 무기다.",
    author: "데일 카네기",
  },
  { quote: "오늘 할 일을 내일로 미루지 마라.", author: "벤저민 프랭클린" },
  {
    quote: "작은 성공을 축하하라. 그것이 더 큰 성공을 부른다.",
    author: "오프라 윈프리",
  },
  { quote: "목표는 꿈을 실현하기 위한 첫걸음이다.", author: "J.P. 모건" },
];

export default function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
