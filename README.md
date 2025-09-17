# 🚀 DP Enterprises - Industrial Solutions Website

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0.5-0055FF)](https://www.framer.com/motion/)

A modern, responsive industrial solutions website for DP Enterprises, specializing in Milton Roy pumping equipment and industrial automation solutions across Madhya Pradesh, Chhattisgarh, and Vidharbha regions.

## 🌟 Features

### ✨ Core Functionality
- **🏭 Industrial Product Showcase**: Comprehensive catalog of Milton Roy pumping solutions
- **📱 Fully Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **🔍 Advanced Search & Filtering**: Find products by category, specifications, and applications
- **📧 Contact Integration**: Professional contact forms with email and WhatsApp notifications
- **🗺️ Multi-Location Support**: Coverage across three major Indian states
- **🎨 Modern UI/UX**: Built with Framer Motion animations and Tailwind CSS

### 🛠️ Technical Features
- **⚡ Next.js 15**: Latest React framework with App Router
- **🎯 TypeScript**: Full type safety and better developer experience
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid styling
- **🎭 Framer Motion**: Smooth animations and micro-interactions
- **📱 Mobile-First**: Responsive design that works perfectly on all devices
- **🔧 API Integration**: Backend email and WhatsApp notifications
- **🖼️ Image Optimization**: Next.js Image component for optimal performance

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React & Tabler Icons

### Backend & Integrations
- **Email Service**: Nodemailer with Gmail SMTP
- **WhatsApp Integration**: Automated notifications
- **Form Handling**: React Hook Form
- **Image Processing**: Next.js Image Optimization

### Development Tools
- **Build Tool**: Next.js with Turbopack
- **Linting**: ESLint
- **Styling**: PostCSS with Autoprefixer
- **Type Checking**: TypeScript Compiler

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20.x)
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prabhatOn/client.git
   cd dp_enterprises
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:
   ```env
   # Email Configuration (Gmail)
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   BUSINESS_EMAIL=your-business-email@gmail.com

   # WhatsApp Configuration (Optional)
   WHATSAPP_API_KEY=your-whatsapp-api-key
   WHATSAPP_PHONE_NUMBER=your-whatsapp-number
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dp_enterprises/
├── 📁 public/                 # Static assets
│   ├── 📁 assets/            # Images and media files
│   ├── 📁 clients/           # Client logos
│   └── 📁 new/               # Product images
├── 📁 src/
│   ├── 📁 app/               # Next.js App Router
│   │   ├── 📁 api/           # API routes
│   │   ├── 📁 category/      # Category pages
│   │   ├── 📁 product/       # Product pages
│   │   └── 📄 layout.tsx     # Root layout
│   ├── 📁 components/        # React components
│   │   ├── 📁 about/         # About page components
│   │   ├── 📁 common/        # Shared components
│   │   ├── 📁 layout/        # Layout components
│   │   ├── 📁 product/       # Product components
│   │   └── 📁 data/          # Data files
│   ├── 📁 pages/             # Next.js pages (if using Pages Router)
│   ├── 📁 styles/            # Global styles
│   └── 📁 types/             # TypeScript type definitions
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.ts     # Tailwind configuration
├── 📄 next.config.ts         # Next.js configuration
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 BACKEND_SETUP_GUIDE.md # Backend setup instructions
├── 📄 EMAIL_SETUP_GUIDE.md   # Email setup guide
└── 📄 README.md              # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Additional commands
npm run type-check   # Type checking (if configured)
npm run export       # Export static site (if needed)
```

## ⚙️ Configuration

### Email Setup
For contact form functionality, follow the detailed setup guide:
- 📖 [Backend Setup Guide](./BACKEND_SETUP_GUIDE.md)
- 📧 [Email Setup Guide](./EMAIL_SETUP_GUIDE.md)

### Environment Variables
```env
# Required
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
BUSINESS_EMAIL=your-business-email@gmail.com

# Optional
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_PHONE_NUMBER=your-whatsapp-number
```

## 🌐 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- **Netlify**: Connect repository and configure build settings
- **Railway**: Use the Dockerfile or build settings
- **AWS Amplify**: Connect repository and configure build settings

### Build for Production
```bash
npm run build
npm run start
```

## 🎨 Customization

### Styling
- **Colors**: Modify Tailwind config in `tailwind.config.ts`
- **Fonts**: Update font settings in `src/styles/globals.css`
- **Components**: Customize component styles using Tailwind classes

### Content
- **Products**: Update `src/components/data/products-complete.json`
- **Company Info**: Modify contact details in relevant components
- **Images**: Replace images in `public/` directory

### Features
- **Add new pages**: Create in `src/app/` directory
- **New components**: Add to `src/components/` directory
- **API routes**: Create in `src/app/api/` directory

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test thoroughly**: Ensure responsive design works on all devices
5. **Commit changes**: `git commit -m 'Add your feature'`
6. **Push to branch**: `git push origin feature/your-feature`
7. **Create a Pull Request**

### Development Guidelines
- ✅ Use TypeScript for all new code
- ✅ Follow mobile-first responsive design principles
- ✅ Test on multiple devices and screen sizes
- ✅ Maintain consistent code formatting
- ✅ Add proper error handling
- ✅ Update documentation for new features

## 📞 Support & Contact

**DP Enterprises**
- 📧 Email: dpenterprises2007@gmail.com
- 📱 Phone: +91-9425902891
- 🌐 Website: [dpenterprises.com](https://dpenterprises.com)
- 📍 Service Areas: Madhya Pradesh, Chhattisgarh, Vidharbha (Nagpur)

### Technical Support
- 🐛 Issues: [GitHub Issues](https://github.com/prabhatOn/client/issues)
- 📖 Documentation: [Next.js Docs](https://nextjs.org/docs)
- 🎯 Feature Requests: Create an issue with the "enhancement" label

## 📄 License

This project is proprietary software owned by DP Enterprises. All rights reserved.

## 🙏 Acknowledgments

- **Milton Roy**: Premium pumping equipment and solutions
- **Next.js Team**: Amazing React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations library
- **Vercel**: Excellent deployment platform

---

**Built with ❤️ for industrial excellence**

*DP Enterprises - Where Precision Meets Performance*
