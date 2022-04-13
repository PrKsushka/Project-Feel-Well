import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/types';

type Saved = {
  saved: string;
};
const SavedRecipes: React.FunctionComponent = () => {
  const params = useParams();
  const { saved } = params as Saved;
  const directories = useSelector((state: StoreState) => state.recipes.favouriteRecipes);
  const dir = directories.find((el) => {
    return el[0] === saved;
  });

  return <div>{dir.map((el: any, i: React.Key | null | undefined) => el[1].map((el: any) => <div key={i}>{el}</div>))}</div>;
};
export default SavedRecipes;
