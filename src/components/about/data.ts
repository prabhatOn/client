import { 
  Calendar, 
  Users, 
  Star, 
  Globe, 
  Shield, 
  CheckCircle, 
  Award, 
  Target, 
  Factory, 
  Building, 
  Wrench, 
  MapPin 
} from "lucide-react"
import { StatData, Achievement, CompanyInfoItem } from './types'

// Stats data for counting animation with brand colors
export const statsData: StatData[] = [
  {
    icon: Calendar,
    number: 17,
    suffix: "+",
    label: "Years Experience",
    description: "Serving industries since 2007"
  },
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Satisfied Clients", 
    description: "Trusted across industries"
  },
  {
    icon: Star,
    number: 1000,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered"
  },
  {
    icon: Globe,
    number: 3,
    suffix: "",
    label: "Service Areas",
    description: "MP, CG & Nagpur region"
  }
]

// Company achievements
export const achievements: Achievement[] = [
  {
    icon: Shield,
    title: "17+ Years Experience",
    description: "Proven track record in industrial pumping solutions"
  },
  {
    icon: CheckCircle,
    title: "500+ Satisfied Clients",
    description: "Trusted by leading companies across industries"
  },
  {
    icon: Award,
    title: "Milton Roy Authorized",
    description: "Official distributor of premium pumping equipment"
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "ISO certified products and services"
  }
]

// Company info
export const companyInfo: CompanyInfoItem[] = [
  {
    icon: Calendar,
    label: "Year of Establishment",
    value: "2007"
  },
  {
    icon: Factory,
    label: "Nature of Business",
    value: "Distributor / Channel Partner"
  },
  {
    icon: Users,
    label: "Number of Employees",
    value: "11 to 25 People"
  },
  {
    icon: Building,
    label: "Annual Turnover",
    value: "Rs. 50 Lakh - 1 Crore"
  },
  {
    icon: Wrench,
    label: "GST Number",
    value: "23AAGFD0047F1Z4"
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "Indore, Madhya Pradesh"
  }
]
