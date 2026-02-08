import { IGroupRequirementGovernmentIds } from "./IGroupRequirementGovernmentIds";

export interface IGovernmentIds extends IDefault {
  code: string;
  label: string;
  officialUrls: string[];
  requirements: IGroupRequirementGovernmentIds[];
  description?: string;
}
