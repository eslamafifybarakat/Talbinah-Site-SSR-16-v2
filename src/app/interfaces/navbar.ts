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
  {
    title: 'navigationHeader.home',
    label: 'navigationHeader.home',
    route: '/Home',
    icon: '',
    isActive: false
  },
  {
    title: 'navigationHeader.doctors',
    label: 'navigationHeader.doctors',
    route: '/DoctorsAndTherapists',
    icon: '',
    isActive: false
  },
  {
    title: 'navigationHeader.join',
    label: 'navigationHeader.join',
    route: '/JoinUs',
    icon: '',
    isActive: false
  },
  {
    title: 'navigationHeader.blogs',
    label: 'navigationHeader.blogs',
    route: '/Blogs',
    icon: '',
    isActive: false
  },
  {
    title: 'navigationHeader.contact',
    label: 'navigationHeader.contact',
    route: '/ContactUs',
    icon: '',
    isActive: false
  },


  // {
  //   title: 'nav.support.title',
  //   label: 'nav.support.title',
  //   route: '/Support',
  //   icon: '',
  //   isActive: false,
  //   children: [
  //     {
  //       title: 'nav.support.items.contactUs',
  //       label: 'nav.support.items.contactUs',
  //       route: '/ContactUs',
  //       icon: ''
  //     },
  //     {
  //       title: 'nav.support.items.faqs',
  //       label: 'nav.support.items.faqs',
  //       route: '/FAQs',
  //       icon: ''
  //     }
  //   ]
  // }
];
