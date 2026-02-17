import { IRequirement } from "./IRequirement";
import { IUserAccount } from "./IUserAccount";

export interface IUserRequirement extends IDefault {
  userId: string;
  requirementId: string;

  isCompleted: boolean;
  fileUrl: string;
  verified: boolean;

  user: IUserAccount;
  requirement: IRequirement;
}
