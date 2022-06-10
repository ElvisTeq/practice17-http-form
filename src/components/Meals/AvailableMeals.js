import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Show loading (default true (because it is loading when loading page))

  // useEffect() => cannot return a promise, but a function inside can "fetchMeals()"
  // Automatically fetch data at the end of event cycle
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-58740-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        // .push => Add {object} into [loadedMeals] array
        loadedMeals.push({
          // Data is stored as => {data.key.objects}
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false); // Toggle loading message off
    };

    fetchMeals();
  }, []); // No need to fetch data anymore (run only once after page loads)

  // Show loading message if "fetchMeals()" is not finished running
  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading...</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
