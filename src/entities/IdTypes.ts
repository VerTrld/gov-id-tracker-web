import { IRequirement } from "./IRequirement";

export interface IdTypes extends IDefault {
  code: string;
  label: string;
  officialUrls: string[];
  description?: string;
  requirements: IRequirement[];
  applications: any[];
}
