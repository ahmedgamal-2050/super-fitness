export const BASE_URL = 'https://fitness.elevateegy.com/api/v1';
export const SECONDARY_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const ENDPOINTS = {
  MUSCLE_GROUP_LIST: `${BASE_URL}/muscles`,
  MUSCLE_LIST_BY_GROUP_ID: `${BASE_URL}/musclesGroup/{groupId}`,
  MEAL_CATEGORIES: `${SECONDARY_BASE_URL}/categories.php`,
  MEAL_LIST_BY_CATEGORY_NAME: `${SECONDARY_BASE_URL}/filter.php?c={categoryName}`,
  MEAL_DETAILS: `${SECONDARY_BASE_URL}/lookup.php?i={mealId}`,
} as const;
