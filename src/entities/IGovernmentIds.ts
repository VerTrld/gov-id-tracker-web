import { IGroupRequirementGovernmentIds } from "./IGroupRequirementGovernmentIds";
import { IRequirementGovernmentIds } from "./IRequirementGovernmentIds";
import { IUserGovernmentIds } from "./IUserGovernmentIds";

export interface IGovernmentIds extends IDefault {
  code: string;
  label: string;
  officialUrls: string[];
  requirements: IGroupRequirementGovernmentIds[];
  description?: string;
  RequirementGovernmentIds: IRequirementGovernmentIds[];
  RequireGovernmentIds: IRequirementGovernmentIds[];
  UserGovernmentIds: IUserGovernmentIds;
}
