export interface MuscleGroupResponse {
  message: string;
  musclesGroup: MuscleGroup[];
}

export interface MuscleGroup {
  _id: string;
  name: string;
}

export interface MuscleListResponse {
  message: string;
  muscleGroup: MuscleGroup;
  muscles: Muscle[];
}

export interface Muscle {
  _id: string;
  name: string;
  image: string;
}

export interface MealCategoryApiResponse {
  categories: MealCategoryApi[];
}

export interface MealCategoryApi {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export interface MealListApiResponse {
  meals: MealApi[];
}

export interface MealApi {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea: string;
  strCountry: string;
}

export interface Meal {
  _id: string;
  name: string;
  image: string;
  country: string;
  area: string;
}

export interface mealDetailsApiResponse {
  meals: mealDetails[];
}

export interface mealDetails {
  idMeal: string;
  strMeal: string;
  strMealAlternate: any;
  strCategory: string;
  strArea: string;
  strCountry: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: any;
  strCreativeCommonsConfirmed: any;
  dateModified: any;
}

export interface MealByCategoryResponse {
  meals: MealByCategory[];
}

export interface MealByCategory {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea?: string;
  strCountry: string;
}
