import { IRequirementList } from "./IRequirementList"
import { IUserRequirement } from "./IUserRequirement"

export interface IRequirement extends IDefault{
    label: string
    UserRequirements: IUserRequirement[]
    RequireRequirementLists: any
    RequirementList?: IRequirementList
    requirementListId?: string
}