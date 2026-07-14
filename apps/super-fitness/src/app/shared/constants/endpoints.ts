export const BASE_URL = 'https://fitness.elevateegy.com/api/v1';
export const SECONDARY_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const ENDPOINTS = {
  HOME: `${BASE_URL}/home`,
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
  MUSCLE_GROUP_LIST: `${BASE_URL}/muscles`,
  MUSCLE_LIST_BY_GROUP_ID: `${BASE_URL}/musclesGroup/{groupId}`,
  DIFICULTY_LEVELS_PRIME_MOVER: `${BASE_URL}/levels/difficulty-levels/by-prime-mover?primeMoverMuscleId={primeMoverMuscleId}`,
  EXERCISES_BY_MUSCLE_AND_DIFFICULTY: `${BASE_URL}/exercises/by-muscle-difficulty?primeMoverMuscleId={primeMoverMuscleId}&difficultyLevelId={difficultyLevelId}`,
  MEAL_CATEGORIES: `${SECONDARY_BASE_URL}/categories.php`,
  MEAL_LIST_BY_CATEGORY_NAME: `${SECONDARY_BASE_URL}/filter.php?c={categoryName}`,
  Meal_DETAILS_BY_ID: `${SECONDARY_BASE_URL}/lookup.php?i={mealId}`,
  MEAL_CATEGORIES_LIST: `${SECONDARY_BASE_URL}/categories.php`,
} as const;
