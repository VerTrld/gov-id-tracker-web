import { IGovernmentIds } from "./IGovernmentIds";
import { IRequirement } from "./IRequirement";

export interface IRequirementList extends IDefault {
  Requirements: IRequirement[];
  GovernmentIds: IGovernmentIds;
  governmentIdsId: string;
}
