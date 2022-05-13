import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ArticlesTypes from '../../../types/articles.types';

@Entity()
class Articles implements ArticlesTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  main: string;

  @Column()
  image: string;
}

export default Articles;