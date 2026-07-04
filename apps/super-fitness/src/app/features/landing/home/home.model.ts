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
