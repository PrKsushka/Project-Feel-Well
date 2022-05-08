import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meals } from './meals';
import { Ingredients } from './ingredients';

@Entity()
class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Meals, (meals) => meals.id)
  @JoinColumn()
  'mealId': Meals;

  @Column()
  title: string;

  @ManyToOne(() => Ingredients, (ingredients) => ingredients.id)
  @JoinColumn()
  'ingredientId': Ingredients;

  @Column()
  kcal: number;

  @Column()
  time: number;

  @Column()
  rating: number;

  @Column()
  'createdAt': Date;

  @Column()
  image: string;

  @Column()
  video: string;

  @Column()
  fats: number;

  @Column()
  proteins: number;

  @Column()
  carbodygrate: number;

  // @OneToMany(()=>Ingredients, (ingredient)=>(ingredient.ingredient))
  // ingredients: Ingredients[]
}
export default Recipes;