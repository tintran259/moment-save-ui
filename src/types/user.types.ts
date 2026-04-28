export interface UserGoal {
  sourceField: 'daily' | 'monthly' | 'yearly';
  sourceValue: number;
}

export interface User {
  id: string;
  phone: string;
  goal?: UserGoal;
}
