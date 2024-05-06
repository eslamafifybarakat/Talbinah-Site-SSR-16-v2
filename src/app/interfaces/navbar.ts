export interface NavItem {
  title: string;
  label: string;
  route: string;
  icon?: string;
  logout?: boolean;
  isActive?: boolean;
  children?: NavItem[]; // Optional array of NavItem for nested navigation
}

export const navItems = [
  { title: 'nav.home', label: 'nav.home', route: '/Home', icon: '', isActive: false },
  {
    title: 'nav.services.title',
    label: 'nav.services.title',
    route: '/Services',
    icon: '',
    isActive: false,
    children: [
      {
        title: 'nav.services.items.offices',
        label: 'nav.services.items.offices',
        route: '/Services/Offices',
        icon: ''
      },
      {
        title: 'nav.services.items.recruitmentRequest',
        label: 'nav.services.items.recruitmentRequest',
        route: '/Services/EmployeeRequests',
        icon: ''
      },
      {
        title: 'nav.services.items.sponsorshipTransfer',
        label: 'nav.services.items.sponsorshipTransfer',
        route: '/Services/SponsorshipTransfer',
        icon: ''
      }
    ]
  },
  {
    title: 'nav.aboutEstkdam.title',
    label: 'nav.aboutEstkdam.title',
    route: '/AboutEstkdam',
    icon: '',
    isActive: false,
    children: [
      {
        title: 'nav.aboutEstkdam.items.policies',
        label: 'nav.aboutEstkdam.items.policies',
        route: '/Policies',
        icon: ''
      },
      {
        title: 'nav.aboutEstkdam.items.journey',
        label: 'nav.aboutEstkdam.items.journey',
        route: '/Journey',
        icon: ''
      }
    ]
  },
  {
    title: 'nav.support.title',
    label: 'nav.support.title',
    route: '/Support',
    icon: '',
    isActive: false,
    children: [
      {
        title: 'nav.support.items.contactUs',
        label: 'nav.support.items.contactUs',
        route: '/ContactUs',
        icon: ''
      },
      {
        title: 'nav.support.items.faqs',
        label: 'nav.support.items.faqs',
        route: '/FAQs',
        icon: ''
      }
    ]
  }
];
