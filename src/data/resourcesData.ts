export interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  mail?: string;
  featured?: boolean;
}

export const categories = [
  "Housing & Homelessness Assistance",
  "Food & Financial Assistance",
  "Senior & Disability Services",
  "Health & Medical Support",
  "Philanthropy & Grants",
  "Emergency Preparedness",
  "Community Development",
  "Cultural & International",
];

export const resources: Resource[] = [
  {
    id: "1",
    name: "The Carying Place",
    category: "Housing & Homelessness Assistance",
    description: "Stabilizes working families experiencing homelessness.",
    address: "491 James Jackson Ave, Cary, NC 27513",
    phone: "919-462-1800",
    email: "info@thecaryingplace.org",
    website: "https://www.thecaryingplace.org/",
    mail: "The Carying Place, P.O. Box 622, Cary, NC 27512",
    hours: "Services by appointment",
    featured: true,
  },
  {
    id: "2",
    name: "Preserving Home",
    category: "Housing & Homelessness Assistance",
    description: "Helps low-income homeowners repair and maintain their homes so they can stay stable.",
    phone: "919-341-5980",
    email: "info@preservehome.org",
    website: "https://preservehome.org/",
    mail: "PO Box 4099, Cary, NC 27519",
    hours: "Not listed",
  },
  {
    id: "3",
    name: "NeighborUp",
    category: "Food & Financial Assistance",
    description: "Provides food assistance and financial help, job programs, and crisis support.",
    address: "187 High House Rd., Cary, NC 27511",
    phone: "919-469-9861",
    email: "ellen@dorcascary.org",
    website: "https://neighborup.org/",
    hours: "Thrift Store: Mon-Sat 10 AM-6 PM | Client Services: Mon-Sat 9 AM-3 PM",
    featured: true,
  },
  {
    id: "4",
    name: "The Center for Volunteer Caregiving",
    category: "Senior & Disability Services",
    description: "Matches volunteers with seniors and adults with disabilities for rides, caregiver support, and home assistance.",
    address: "1150 SE Maynard Rd Suite 210, Cary, NC 27511",
    phone: "919-460-0567",
    email: "info@volunteercaregiving.org",
    website: "https://volunteercaregiving.org/",
    hours: "Mon-Fri 9 AM-4 PM",
    featured: true,
  },
  {
    id: "5",
    name: "Caring Community Foundation",
    category: "Health & Medical Support",
    description: "Provides emergency financial assistance for local cancer patients facing housing and medical hardship.",
    phone: "919-480-8887",
    email: "info@caringcommunityfoundation.org",
    website: "https://www.caringcommunityfoundation.org/",
    mail: "PO Box 1364, Cary, NC 27512",
    hours: "Not listed",
  },
  {
    id: "6",
    name: "Cary Community Foundation",
    category: "Philanthropy & Grants",
    description: "A philanthropy group that funds local charities and community projects through grants.",
    address: "3737 Glenwood Ave. Suite 460 Raleigh, NC 27612",
    phone: "910-292-4437",
    website: "https://www.nccommunityfoundation.org/affiliate/cary-community-foundation",
    mail: "PO Box 6041, Cary, NC 27519",
    hours: "Not listed",
  },
  {
    id: "7",
    name: "Ivy Community Service Foundation of Cary",
    category: "Philanthropy & Grants",
    description: "Provide scholarships, community grants, and outreach programs in areas such as education, health, arts, economics, and family support, giving resources and support to underserved.",
    email: "president.icsfc@gmail.com",
    website: "https://icsfofcaryinc.org",
    mail: "P.O. Box 5823, Cary, NC 27512",
    hours: "Walk in service",
  },
  {
    id: "8",
    name: "Cary CERT Association",
    category: "Emergency Preparedness",
    description: "Trains volunteers in emergency preparedness and assists first responders during local disasters.",
    email: "carycert@gmail.com",
    website: "https://www.carycert.org/",
    mail: "PO Box 4765, Cary, NC 27519",
    hours: "Volunteer emergency group",
  },
  {
    id: "9",
    name: "Missions of Hope NC",
    category: "Community Development",
    description: "Promotes downtown Cary's development through events, community projects, and advocacy.",
    address: "1410 Bridges Street, Morehead City NC",
    phone: "252-240-2359",
    email: "info@hopemissionnc.org",
    website: "https://hopemissionnc.org/",
    mail: "PO Box 4903, Cary, NC 27519",
    hours: "Not listed",
  },
  {
    id: "10",
    name: "Heart of Cary Association",
    category: "Community Development",
    description: "Promotes downtown Cary's development through events, community projects, and advocacy.",
    address: "205 S Academy St Unit 4903, Cary, NC 27519",
    website: "https://heartofcary.org/",
    mail: "PO Box 4903, Cary, NC 27519",
    phone: "Not listed",
    hours: "Not listed",
  },
  {
    id: "11",
    name: "Sister Cities Association of Cary",
    category: "Cultural & International",
    description: "Builds international relationships, cultural exchanges, and global education programs for Cary residents.",
    email: "info@carysistercities.org",
    website: "https://www.carysistercities.org/",
    mail: "PO Box 4752, Cary, NC 27519",
    hours: "Event-based, no office hours",
  },
];
