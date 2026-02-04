import * as y from "yup";

export enum PersonActionEnum{
  register="register",
  login ="login"
}

export const PersonSchema = y.object({
  action: y.string().oneOf(['register','login']).required(),
  email: y.string().required("Email is required").email(),
  isTerms: y.boolean().required(),
  password: y.string().required("Password is required"),
  firstName: y.string().when("action", {
    is: "register",
    then: (s) => s.required("First name is required"),
    otherwise: (s) => s.optional(),
  }),
  lastName: y.string().when("action", {
    is: "register",
    then: (s) => s.required("Last name is required"),
    otherwise: (s) => s.optional(),
  }),
  confirmPassword: y.string().when("action", {
    is: "register",
    then: (s) =>
      s
        .required("Confirm password is required")
        .oneOf([y.ref("password")], "Passwords must match"),
    otherwise: (s) => s.strip(), // removes it in login mode
  }),
});

type IPersonShcema = y.InferType<typeof PersonSchema>;

export default IPersonShcema;
