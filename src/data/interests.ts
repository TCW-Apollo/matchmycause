
export interface Interest {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const interests: Interest[] = [
  {
    id: "environment",
    name: "Environment & Conservation",
    description: "Protecting natural habitats and promoting sustainability",
    icon: "Leaf",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    id: "education",
    name: "Education & Learning",
    description: "Supporting access to quality education for all",
    icon: "BookOpen",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: "health",
    name: "Health & Wellness",
    description: "Improving healthcare access and promoting well-being",
    icon: "Heart",
    color: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    id: "animals",
    name: "Animal Welfare",
    description: "Protecting and caring for animals in need",
    icon: "Paw",
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    id: "arts",
    name: "Arts & Culture",
    description: "Preserving and celebrating artistic and cultural heritage",
    icon: "Palette",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: "human-rights",
    name: "Human Rights",
    description: "Advocating for equality, justice, and human dignity",
    icon: "Scale",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  },
  {
    id: "hunger",
    name: "Hunger & Poverty",
    description: "Working to eliminate hunger and reduce poverty",
    icon: "Utensils",
    color: "bg-orange-50 text-orange-600 border-orange-200"
  },
  {
    id: "disaster",
    name: "Disaster Relief",
    description: "Providing aid during and after natural disasters",
    icon: "HandHelping",
    color: "bg-red-50 text-red-600 border-red-200"
  }
];
