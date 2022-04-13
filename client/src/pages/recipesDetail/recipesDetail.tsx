import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import { deleteFromShoppingList, saveToShoppingList } from '../../store/modules/recipes/recipes.actions';

type RecipesDetailTypes = {
  detailId: number;
};

const RecipesDetail = (elem: any) => {
  const params = useParams();
  const { detailId } = params as RecipesDetailTypes;
  const recipes = useSelector((state: StoreState) => getRecipes(state));
  const findRecipeDetails: ProductElement | undefined = recipes.find((el) => {
    return el._id === detailId;
  });
  const dispatch = useDispatch();
  const changeFunc = (elem: any) => (e: any) => {
    const { value, checked } = e.target;
    if (checked === true && value !== ' ') {
      dispatch(saveToShoppingList(value));
    }
    if (checked === false) {
      dispatch(deleteFromShoppingList(value));
    }
  };

  if (findRecipeDetails) {
    return (
      <div>
        <img src={`${require(`../../${findRecipeDetails.image}`)}`} />
        <div>{findRecipeDetails.name}</div>
        <div>
          {findRecipeDetails.ingredients?.map((el, i) => (
            <div key={i}>
              <label>
                {el}
                <input type="checkbox" onChange={changeFunc(el)} value={el} name={el} />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div>Not found</div>;
};
export default RecipesDetail;
