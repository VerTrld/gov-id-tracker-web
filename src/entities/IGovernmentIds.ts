import { IRequirementList } from "./IRequirementList";
import { IUserGovernmentIds } from "./IUserGovernmentIds";

export interface IGovernmentIds extends IDefault {
  code: string;
  label: string;
  officialUrls: string[];
  RequirementLists: IRequirementList[]
  description?: string;
  UserGovernmentIds: IUserGovernmentIds;
}
