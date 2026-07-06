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
