import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '@slices';

export const IngredientDetails: FC = () => {
  const ingreds = useSelector(getIngredients);
  const idParam = useParams();
  const ingredientData = ingreds.find(
    (ingredient) => ingredient._id === idParam.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
