export const governmentIds = {
  philid: {
    title: "Philippine National ID (PhilSys ID)",
    path: "/user/philid",
    description:
      "Serves as the primary proof of identity and can be used to apply for other government IDs and services.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 50 },
      {
        id: "valid-id",
        label: "Any supporting valid ID (if available)",
        value: 50,
      },
    ],
    officialWebsite: "https://philsys.gov.ph/",
  },

  tin: {
    title: "Tax Identification Number (TIN)",
    path: "/user/tin",
    description:
      "Required for employment, salary processing, and tax-related transactions.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 33 },
      { id: "valid-id", label: "Valid government-issued ID", value: 33 },
      {
        id: "barangay-cert",
        label: "Barangay Certificate (for first-time jobseekers)",
        value: 34,
      },
    ],
    officialWebsite: "https://www.bir.gov.ph/",
  },

  sss: {
    title: "Social Security System (SSS) ID / UMID",
    path: "/user/sss",
    description:
      "Used for employment benefits, loans, and social security services.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 33 },
      { id: "valid-id", label: "Valid ID", value: 33 },
      {
        id: "sss-num",
        label: "SSS Number (obtained through online registration)",
        value: 34,
      },
    ],
    officialWebsite: "https://www.sss.gov.ph/",
  },

  philhealth: {
    title: "PhilHealth ID",
    path: "/user/philhealth",
    description:
      "Proof of membership for health insurance coverage and employment requirements.",
    requirements: [
      {
        id: "pmrf",
        label: "PhilHealth Member Registration Form (PMRF)",
        value: 34,
      },
      { id: "birth-cert", label: "PSA Birth Certificate", value: 33 },
      { id: "valid-id", label: "Valid ID", value: 33 },
    ],
    officialWebsite: "https://www.philhealth.gov.ph/",
  },

  pagibig: {
    title: "Pag-IBIG ID (HDMF ID)",
    path: "/user/pagibig",
    description:
      "Required for housing loans, savings, and employment documentation.",
    requirements: [
      {
        id: "pagibig-form",
        label: "Pag-IBIG Membership Registration Form",
        value: 34,
      },
      {
        id: "birth-cert",
        label: "PSA Birth Certificate (if required)",
        value: 33,
      },
      { id: "valid-id", label: "Valid ID", value: 33 },
    ],
    officialWebsite: "https://www.pagibigfund.gov.ph/",
  },

  nbi: {
    title: "NBI Clearance",
    path: "/user/nbi",
    description:
      "A mandatory pre-employment requirement to verify criminal record status.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 33 },
      {
        id: "valid-id",
        label: "At least one valid government-issued ID",
        value: 33,
      },
      {
        id: "barangay-cert",
        label: "Barangay Certificate (for first-time jobseekers)",
        value: 34,
      },
    ],
    officialWebsite: "https://nbi.gov.ph/",
  },

  passport: {
    title: "Philippine Passport",
    path: "/user/passport",
    description:
      "Serves as a strong proof of identity and citizenship; useful for travel and employment.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 25 },
      { id: "valid-id", label: "Valid ID", value: 25 },
      {
        id: "dfa-form",
        label: "DFA Passport Appointment Confirmation",
        value: 25,
      },
      { id: "payment", label: "Payment Receipt", value: 25 },
    ],
    officialWebsite: "https://passport.gov.ph/",
  },

  postal: {
    title: "Postal ID",
    path: "/user/postal",
    description:
      "A widely accepted secondary ID for government and private transactions.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 25 },
      { id: "valid-id", label: "Valid ID", value: 25 },
      {
        id: "proof-address",
        label: "Barangay Clearance or Proof of Address",
        value: 25,
      },
      { id: "postal-form", label: "Application Form", value: 25 },
    ],
    officialWebsite: "https://postalid.ph/",
  },

  driverlicense: {
    title: "Driver’s License (Optional)",
    path: "/user/driverlicense",
    description:
      "Required for jobs involving driving; accepted as a valid government ID.",
    requirements: [
      { id: "birth-cert", label: "PSA Birth Certificate", value: 20 },
      { id: "medical-cert", label: "Medical Certificate", value: 20 },
      {
        id: "student-permit",
        label: "Student Permit (for new applicants)",
        value: 20,
      },
      { id: "valid-id", label: "Valid ID", value: 20 },
      { id: "payment", label: "Payment Receipt", value: 20 },
    ],
    officialWebsite: "https://www.lto.gov.ph/",
  },
};



export interface IDInfo {
  logo: string;
  title: string;
  description: string;
}
export const idsInfo = [
  {
    id: "philid",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
    title: "National ID",
    description: "A government-issued ID that proves your identity as a Filipino citizen or resident.",
  },
  {
    id: "tin",
    logo: `${process.env.NEXT_PUBLIC_TIN_ID}`,
    title: "BIR TIN",
    description: "A unique number issued by the BIR for tax identification and transactions.",
  },
  {
    id: "sss",
    logo: `${process.env.NEXT_PUBLIC_SSS}`,
    title: "SSS",
    description: "A government program that provides social security benefits for workers.",
  },
  {
    id: "philhealth",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "PhilHealth",
    description: "A national health insurance program that helps cover medical and hospital expenses.",
  },
  // {
  //   id: "psa",
  //   logo: "",
  //   title: "PSA Birth Certificate",
  //   description: "An official document that records your birth details from the Philippine Statistics Authority.",
  // },
  {
    id: "pagibig",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "Pag-Ibig",
    description: "A unique number issued by the BIR for tax identification and transactions.",
  },
  {
    id: "nbi",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "NBI",
    description: "A government-issued ID that proves your identity as a Filipino citizen or resident.",
  },
  {
    id: "passport",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "Philippines Passport",
    description: "An official document that records your birth details from the Philippine Statistics Authority.",
  },
  {
    id: "postal",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "Postal ID",
    description: "A government program that provides social security benefits for workers.",
  },
  {
    id: "driverlicense",
    logo: `${process.env.NEXT_PUBLIC_PHILHEALTH}`,
    title: "Drivers License",
    description: "A national health insurance program that helps cover medical and hospital expenses.",
  },
];

export interface IGovRequirements {
  logo: string;
  title: string;
 
}
export const govRequirements = [
  {
    title: "Police Clearance",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "NBI Clearance",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "Medical Certificate",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "Barangay Clearance",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "PSA Birth Certificate",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "Marriage Certificate",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "Transcript of Records",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "TIN ID",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
  {
    title: "UMID ID",
    logo: `${process.env.NEXT_PUBLIC_NATIONAL_ID}`,
  },
];





