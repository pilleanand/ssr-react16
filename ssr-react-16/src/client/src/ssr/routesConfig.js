import LandingComponent from '../pages/landing/components/LandingComponent';
import AboutComponent from '../pages/about/components/AboutComponent';

export default [
  {
    path: "/",
    component: LandingComponent,
    exact: true,
  },
  {
    path: '/about',
    component: AboutComponent,
    exact: true,
  }
];