type InterestingFactsTypes = {
  id: number;
  image: string;
  name: string;
  content: string;
};
const interestingFactsForHome: Array<InterestingFactsTypes> = [
  {
    id: 1,
    image: 'assets/bellPepper.png',
    name: 'Вегетариантсво',
    content: 'Cистема питания преимущественно либо исключительно растительной пищей. Существуют различные виды вегетарианства, которые сводятся...',
  },
  {
    id: 2,
    image: 'assets/honey.png',
    name: 'Потребление углеводов',
    content:
      'В среднем суточная потребность в углеводах составляет 350-400 г. Содержание углеводов в диете № 15 (общий стол) в больницах не должно превышать...',
  },
  {
    id: 3,
    image: 'assets/eggs.png',
    name: 'Сахарный диабет',
    content: 'Группа эндокринных заболеваний, связанных с нарушением усвоения глюкозы и развивающихся вследствие абсолютной или относительной...',
  },
];
export default interestingFactsForHome;
