interface RecipesTypes {
  id?: number;
  name: string;
  meal: any;
  title: string;
  ingredients: any;
  kcal: number;
  time: number;
  rating: number;
  createdAt: Date | string;
  image: string;
  video: string;
  carbohydrate: number,
  fats: number,
  proteins: number,
}
export default RecipesTypes;
