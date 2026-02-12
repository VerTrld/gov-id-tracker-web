import { IRequirement } from "./IRequirement"

export interface IUserRequirement extends IDefault{
    isActive: boolean
  requirementsId: string
  Requirement : IRequirement
  userAccountId: string
  UserAccount : any
}