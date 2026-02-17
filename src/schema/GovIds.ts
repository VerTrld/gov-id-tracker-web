import * as y from "yup";

export const governmentIdsFormSchema = y.object({
    label: y.string().required(),
    code: y.string().required(),
    officialUrls: y.string().required(),
    description: y.string().optional(),
    requirementIds: y.array(
        y.object({
            id: y.string().optional(),
            label: y.string().required(),
        })
    ).min(1),
});

type IGovernmentIdsForm = y.InferType<typeof governmentIdsFormSchema>;

export default IGovernmentIdsForm;
