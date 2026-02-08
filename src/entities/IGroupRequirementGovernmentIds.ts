import { IRequirementGovernmentIds } from "./IRequirementGovernmentIds";

export interface IGroupRequirementGovernmentIds extends IDefault {
  label: string;
  minRequirement: number;
  require: IRequirementGovernmentIds[];
}
