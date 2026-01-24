import * as y from "yup";

export const PersonSchema = y.object({
  name: y.string().optional(),
  email: y.string().required(),
  password: y.string().required(),
});
type IPersonShcema = y.InferType<typeof PersonSchema>;

export default IPersonShcema;
