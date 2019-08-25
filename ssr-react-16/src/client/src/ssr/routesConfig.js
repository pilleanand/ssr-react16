import LandingComponent from '../components/pages/landing';
import AboutComponent from '../components/pages/donationCampaigns/components/AboutComponent';

import {
  DONATE
} from './webClientEndPoints';

export default [
  {
    path: "/",
    component: LandingComponent,
    exact: true,
  },
  {
    path: `/${AboutComponent}`,
    component: DonateComponent,
    exact: true,
  }
];