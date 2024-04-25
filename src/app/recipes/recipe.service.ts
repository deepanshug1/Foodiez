import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   // Indian Recipes
  //   new Recipe(
  //     'Aloo Paratha',
  //     'A delicious and satisfying flatbread stuffed with spiced potatoes.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Aloo Paratha
  //     [
  //       new Ingredient('Potatoes', 2),
  //       new Ingredient('All-purpose flour', 1.5),
  //       new Ingredient('Ghee or vegetable oil', 2),
  //       new Ingredient('Salt', 2),
  //       new Ingredient('Cumin seeds', 1),
  //       new Ingredient('Chopped coriander leaves (cilantro)', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Chai',
  //     'Aromatic and warming beverage made with black tea, milk, and spices.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Chai
  //     [
  //       new Ingredient('Black tea leaves', 2),
  //       new Ingredient('Water', 4),
  //       new Ingredient('Milk', 1),
  //       new Ingredient('Sugar', 3),
  //       new Ingredient('Ginger (peeled and grated)', 1),
  //       new Ingredient('Cardamom pods', 3),
  //       new Ingredient('Cinnamon stick', 1),
  //       new Ingredient('Cloves', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Butter Chicken',
  //     'Creamy tomato-based curry with tender chicken pieces.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Butter Chicken
  //     [
  //       new Ingredient('Chicken thighs (boneless, skinless)', 1),
  //       new Ingredient('Plain yogurt', 1),
  //       new Ingredient('Lemon juice', 2),
  //       new Ingredient('Ginger-garlic paste', 2),
  //       new Ingredient('Ground coriander', 1),
  //       new Ingredient('Turmeric powder', 1),
  //       new Ingredient('Kashmiri red chili powder', 1),
  //       new Ingredient('Garam masala', 1),
  //     ]
  //   ),
  //   // More Indian Dishes
  //   new Recipe(
  //     'Dosa',
  //     'Crispy fermented crepe made from rice and lentil batter, often served with sambar and chutney.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Dosa
  //     [
  //       new Ingredient('Urad dal (black gram)', 1),
  //       new Ingredient('Parboiled rice', 2),
  //       new Ingredient('Fenugreek seeds', 0.5),
  //     ]
  //   ),
  //   new Recipe(
  //     'Samosa',
  //     'Savory fried or baked pastry filled with spiced potatoes and peas.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Samosa
  //     [
  //       new Ingredient('Potatoes', 2),
  //       new Ingredient('Peas (frozen or fresh)', 1),
  //       new Ingredient('All-purpose flour', 1),
  //       new Ingredient('Ghee or vegetable oil', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Palak Paneer',
  //     'Spinach curry with cubes of paneer (Indian cottage cheese).',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Palak Paneer
  //     [
  //       new Ingredient('Spinach', 1),
  //       new Ingredient('Paneer', 1), // Custom Ingredient for Paneer
  //       new Ingredient('Tomatoes', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Biryani',
  //     'Fragrant rice dish layered with meat, vegetables, and spices.',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', // Replace with a public image link for Biryani
  //     [
  //       new Ingredient('Basmati rice', 2),
  //       new Ingredient('Chicken thighs (boneless, skinless)', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
