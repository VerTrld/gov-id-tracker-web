import { IUserRequirement } from "./IUserRequirement";

export interface IRequirement extends IDefault {
  label: string;
  desription?: string;
  requirement: IRequirement;
  userRequirements: IUserRequirement[];
}
