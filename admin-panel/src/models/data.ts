import { number } from "yup";

export type CategoryModel = {
  id: number;
  catName: string;
  catImage: string;
};

export type UserModel = {
  id?: number;
  name: string;
  dob?: string;
  gender?: string;
  hobbies?: string;
  mobileNo?: number;
};
