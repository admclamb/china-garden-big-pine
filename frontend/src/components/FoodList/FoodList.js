import React, { useState, useEffect } from 'react';
import { listFood } from '../../api/FetchFood';
import Card from '../Card/Card';
import FoodCard from '../FoodCard/FoodCard';
const FoodList = ({ query, setCart, error, setError }) => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setFoods([]);
    setError(null);
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await listFood(
          query ? { category: query } : {},
          abortController.signal
        );
        setFoods(response);
      } catch (error) {
        setError(error);
      }
    })();
    return () => abortController.abort();
  }, [query]);
  console.log(foods);
  const foodsList =
    (Array.isArray &&
      foods.map((food) => {
        return <FoodCard key={food.id} food={food} setCart={setCart} />;
      })) ||
    [];
  return <div className="p-3">{foodsList}</div>;
};

export default FoodList;
