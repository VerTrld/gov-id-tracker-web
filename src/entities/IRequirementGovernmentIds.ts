import { IGovernmentIds } from "./IGovernmentIds";
import { IUserGovernmentIds } from "./IUserGovernmentIds";

export interface IRequirementGovernmentIds extends IDefault {
  governmentId: string;
  groupRequireGovernmentId: string;
  requireGovernmentId: string;
  RequireGovernmentIds: IGovernmentIds;
  UserGovernmentIds: IUserGovernmentIds | null;
}
