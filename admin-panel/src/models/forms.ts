export type registrationForm = {
  name?: string;
  email: string;
  password: string;
  roleId?: number;
};

export type CategoryAddFormType = {
  id?: number;
  catName: string;
  catImage?: string[];
};
