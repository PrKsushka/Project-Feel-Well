type Measure = {
  measure: string;
}
type Product = {
  id?: number;
  product: string;
}
type Meal = {
  id: number;
  meal: string;
}

interface Ingredients {
  id?: number;
  count: number;
  measure: Measure;
  product: Product;
}

export interface RecipeTypes {
  _id?: number;
  id?: number;
  name: string;
  image?: string;
  meal?: Meal;
  title: string;
  ingredients?: Array<Ingredients>;
  kcal?: number;
  time?: number;
  rating?: number;
  createdAt?: Date;
  carbohydrate?: number;
  fats?: number;
  proteins?: number;
  video?: string;
}