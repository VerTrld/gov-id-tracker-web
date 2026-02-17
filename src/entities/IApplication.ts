import { ApplicationStatusEnum } from "@/enum/application-status.enum";
import { IUserAccount } from "./IUserAccount";
import { IdTypes } from "./IdTypes";

export interface IApplication extends IDefault {
  userId: string;
  idTypeId: string;
  status: ApplicationStatusEnum;
  isActive: boolean;

  user: IUserAccount;
  idType: IdTypes;
}
