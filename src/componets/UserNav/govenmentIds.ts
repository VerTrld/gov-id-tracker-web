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
    howToGet: [
      "Register online or walk in at an authorized PhilSys registration center.",
      "Submit required documents and biometric information.",
      "Wait for the delivery of the physical ID or use the ePhilID.",
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
    howToGet: [
      "Register through the Bureau of Internal Revenue (BIR) online system or visit the assigned Revenue District Office (RDO).",
      "Submit the required documents and registration form.",
      "First-time job seekers may avail themselves of free registration under RA 11261.",
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
    howToGet: [
      "Register for an SSS number online.",
      "Schedule an appointment and visit an SSS branch.",
      "Submit documents and biometric data for UMID processing.",
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
    howToGet: [
      "Register online or visit a PhilHealth office.",
      "Submit required documents.",
      "Receive PhilHealth Identification Number (PIN) and ID.",
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
    howToGet: [
      "Register online through Virtual Pag-IBIG or at a Pag-IBIG branch.",
      "Submit documents and obtain Pag-IBIG Membership ID Number (MID).",
      "Apply for the Pag-IBIG ID card if needed.",
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
    howToGet: [
      "Register online and set an appointment.",
      "Select payment option (free for qualified first-time jobseekers under RA 11261).",
      "Visit the NBI office for biometrics and clearance issuance.",
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
    howToGet: [
      "Schedule an online appointment with the Department of Foreign Affairs (DFA).",
      "Appear at the DFA office with complete documents.",
      "Wait for passport release or delivery.",
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
    howToGet: [
      "Visit a Philippine Postal Corporation (PHLPost) office.",
      "Submit requirements and have biometrics taken.",
      "Receive the ID after processing.",
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
    howToGet: [
      "Apply for a Student Permit at the Land Transportation Office (LTO).",
      "Complete the required driving course.",
      "Pass written and practical driving tests.",
    ],
    officialWebsite: "https://www.lto.gov.ph/",
  },
};
