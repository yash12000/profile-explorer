import { Profile } from "../types";

export const mockProfiles: Profile[] = [
  {
    id: "profile-1",
    name: "Emily Johnson",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Product Designer with 8 years of experience specializing in user-centered design solutions for tech startups.",
    role: "Product Designer",
    company: "Designify",
    email: "emily.johnson@example.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
    socials: {
      linkedin: "linkedin.com/in/emilyjohnson",
      twitter: "twitter.com/emilyjohnson",
      portfolio: "emilyjohnson.design",
    },
  },
  {
    id: "profile-2",
    name: "Michael Chen",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Full Stack Developer with expertise in React, Node.js, and cloud architecture.",
    role: "Senior Developer",
    company: "TechInnovate",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    address: {
      street: "456 Tech Boulevard",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    socials: {
      linkedin: "linkedin.com/in/michaelchen",
      github: "github.com/michaelchen",
      portfolio: "michaelchen.dev",
    },
  },
  {
    id: "profile-3",
    name: "Sarah Williams",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Marketing strategist specializing in content marketing and brand development for SaaS companies.",
    role: "Marketing Director",
    company: "GrowthMasters",
    email: "sarah.williams@example.com",
    phone: "(555) 789-0123",
    address: {
      street: "789 Market Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    skills: ["Content Strategy", "SEO", "Brand Development", "Analytics"],
    socials: {
      linkedin: "linkedin.com/in/sarahwilliams",
      twitter: "twitter.com/sarahwilliams",
      website: "sarahwilliams.com",
    },
  },
  {
    id: "profile-4",
    name: "David Rodriguez",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Data Scientist with background in machine learning and predictive analytics for healthcare solutions.",
    role: "Lead Data Scientist",
    company: "HealthTech AI",
    email: "david.rodriguez@example.com",
    phone: "(555) 456-7890",
    address: {
      street: "101 Data Drive",
      city: "Boston",
      state: "MA",
      zipCode: "02110",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    skills: ["Python", "Machine Learning", "Data Visualization", "Statistics"],
    socials: {
      linkedin: "linkedin.com/in/davidrodriguez",
      github: "github.com/davidrodriguez",
      website: "davidrodriguez.io",
    },
  },
  {
    id: "profile-5",
    name: "Jessica Kim",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Product Manager with experience in leading cross-functional teams and launching successful products.",
    role: "Senior Product Manager",
    company: "ProductLaunch",
    email: "jessica.kim@example.com",
    phone: "(555) 234-5678",
    address: {
      street: "202 Innovation Road",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    socials: {
      linkedin: "linkedin.com/in/jessicakim",
      twitter: "twitter.com/jessicakim",
      medium: "medium.com/@jessicakim",
    },
  },
  {
    id: "profile-6",
    name: "Robert Taylor",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Financial Analyst with expertise in investment strategies and market trends analysis.",
    role: "Senior Financial Analyst",
    company: "InvestWise",
    email: "robert.taylor@example.com",
    phone: "(555) 345-6789",
    address: {
      street: "303 Finance Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    skills: [
      "Financial Modeling",
      "Investment Analysis",
      "Risk Assessment",
      "Excel",
    ],
    socials: {
      linkedin: "linkedin.com/in/roberttaylor",
      twitter: "twitter.com/roberttaylor",
    },
  },
];
