
import { Interest } from "./interests";

export interface Nonprofit {
  id: string;
  name: string;
  description: string;
  mission: string;
  logo: string;
  interests: string[];
  location: string;
  website: string;
  size: string;
  yearFounded: number;
  impact: string[];
}

export const nonprofits: Nonprofit[] = [
  {
    id: "wildlife-conservation",
    name: "Global Wildlife Alliance",
    description: "Working to protect endangered species and their habitats worldwide",
    mission: "Our mission is to preserve biodiversity and ensure the survival of endangered species through conservation efforts, education, and community engagement.",
    logo: "https://placehold.co/400x400/3b82f6/ffffff?text=GWA",
    interests: ["environment", "animals"],
    location: "San Francisco, CA",
    website: "https://example.com/wildlife",
    size: "Large",
    yearFounded: 1985,
    impact: [
      "Protected over 2 million acres of critical habitat",
      "Helped recover 15 endangered species populations",
      "Engaged 500,000+ people in conservation education"
    ]
  },
  {
    id: "education-for-all",
    name: "Education for All",
    description: "Providing quality education opportunities to underserved communities",
    mission: "We believe every child deserves access to quality education regardless of socioeconomic status. We work to eliminate barriers to education and create pathways to success.",
    logo: "https://placehold.co/400x400/8b5cf6/ffffff?text=E4A",
    interests: ["education", "human-rights"],
    location: "Boston, MA",
    website: "https://example.com/education",
    size: "Medium",
    yearFounded: 1998,
    impact: [
      "Built 230 schools in underserved communities",
      "Provided scholarships to 50,000+ students",
      "Trained 15,000 teachers in effective teaching methods"
    ]
  },
  {
    id: "clean-water-initiative",
    name: "Clean Water Initiative",
    description: "Ensuring access to clean, safe drinking water in developing regions",
    mission: "We work to provide sustainable access to clean water, implement sanitation solutions, and educate communities about water conservation and hygiene.",
    logo: "https://placehold.co/400x400/0ea5e9/ffffff?text=CWI",
    interests: ["environment", "health", "disaster"],
    location: "Seattle, WA",
    website: "https://example.com/water",
    size: "Medium",
    yearFounded: 2005,
    impact: [
      "Provided clean water access to 2 million people",
      "Installed 5,000+ water filtration systems",
      "Reduced waterborne diseases by 65% in partner communities"
    ]
  },
  {
    id: "creative-futures",
    name: "Creative Futures Foundation",
    description: "Supporting arts education and cultural preservation initiatives",
    mission: "We promote artistic expression, preserve cultural heritage, and provide accessible arts education to foster creativity and cultural understanding.",
    logo: "https://placehold.co/400x400/ec4899/ffffff?text=CFF",
    interests: ["arts", "education"],
    location: "New York, NY",
    website: "https://example.com/arts",
    size: "Small",
    yearFounded: 2012,
    impact: [
      "Funded 300+ community arts programs",
      "Provided arts education to 75,000 children",
      "Preserved 50 endangered cultural traditions"
    ]
  },
  {
    id: "hunger-relief-network",
    name: "Hunger Relief Network",
    description: "Combating food insecurity through food banks and sustainable agriculture",
    mission: "We fight hunger through direct food assistance, sustainable agriculture programs, and advocacy for policies that address the root causes of food insecurity.",
    logo: "https://placehold.co/400x400/f97316/ffffff?text=HRN",
    interests: ["hunger", "human-rights", "environment"],
    location: "Chicago, IL",
    website: "https://example.com/hunger",
    size: "Large",
    yearFounded: 1976,
    impact: [
      "Distributed 500 million meals to people in need",
      "Established 150 community gardens in food deserts",
      "Reduced food waste by 30% in partner communities"
    ]
  },
  {
    id: "global-health-access",
    name: "Global Health Access",
    description: "Improving healthcare access in underserved regions worldwide",
    mission: "We work to eliminate healthcare disparities by providing medical services, training healthcare workers, and building sustainable healthcare infrastructure.",
    logo: "https://placehold.co/400x400/ef4444/ffffff?text=GHA",
    interests: ["health", "disaster", "human-rights"],
    location: "Atlanta, GA",
    website: "https://example.com/health",
    size: "Large",
    yearFounded: 1992,
    impact: [
      "Provided healthcare services to 10 million people",
      "Trained 25,000 healthcare workers globally",
      "Established 75 permanent health clinics in underserved areas"
    ]
  },
  {
    id: "digital-education-alliance",
    name: "Digital Education Alliance",
    description: "Bridging the digital divide through technology education and access",
    mission: "We believe digital literacy is essential in today's world. We provide technology access, education, and resources to underserved communities.",
    logo: "https://placehold.co/400x400/06b6d4/ffffff?text=DEA",
    interests: ["education", "human-rights"],
    location: "Austin, TX",
    website: "https://example.com/digital",
    size: "Small",
    yearFounded: 2015,
    impact: [
      "Provided 100,000 computers to students in need",
      "Trained 50,000 people in digital literacy skills",
      "Connected 500 rural communities to high-speed internet"
    ]
  },
  {
    id: "ocean-conservation-trust",
    name: "Ocean Conservation Trust",
    description: "Protecting marine ecosystems and promoting ocean health",
    mission: "We are dedicated to preserving marine biodiversity, reducing ocean pollution, and promoting sustainable use of ocean resources.",
    logo: "https://placehold.co/400x400/0284c7/ffffff?text=OCT",
    interests: ["environment", "animals"],
    location: "San Diego, CA",
    website: "https://example.com/ocean",
    size: "Medium",
    yearFounded: 2001,
    impact: [
      "Protected 3 million acres of marine habitat",
      "Removed 2 million pounds of plastic from oceans",
      "Rehabilitated 10,000 injured marine animals"
    ]
  }
];

export const getMatchingNonprofits = (selectedInterests: string[]): Nonprofit[] => {
  if (selectedInterests.length === 0) return nonprofits;
  
  return nonprofits.filter(nonprofit => 
    nonprofit.interests.some(interest => selectedInterests.includes(interest))
  ).sort((a, b) => {
    // Sort by number of matching interests (descending)
    const aMatches = a.interests.filter(i => selectedInterests.includes(i)).length;
    const bMatches = b.interests.filter(i => selectedInterests.includes(i)).length;
    return bMatches - aMatches;
  });
};
