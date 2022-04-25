import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProductElement, StoreState } from '../../store/types';
import Card from '../../components/card/card';

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

  if (dir[1].length > 0) {
    return (
      <div>
        {dir[1].map((el: ProductElement, i: number) => (
          <Card el={el} obj={{ param: false }} />
        ))}
      </div>
    );
  } else {
    return <div>Your directory is empty</div>;
  }
};
export default SavedRecipes;
