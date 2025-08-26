// Type definitions for About page components
export type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  overview?: string
  items: any[]
}

export type ProductsData = {
  categories: {
    [key: string]: ProductCategory
  }
}

export type StatData = {
  icon: any
  number: number
  suffix: string
  label: string
  description: string
}

export type Achievement = {
  icon: any
  title: string
  description: string
}

export type CompanyInfoItem = {
  icon: any
  label: string
  value: string
}
