import { combineReducers } from '@reduxjs/toolkit';

import calendarReducer from "./calendar/calendarReducer";
import contactReducer from "./contact/contactReducer";
import customiseReducer from "./customise/customiseReducer";
import ecommerceReducer from "./ecommerce/ecommerceReducer";
import country from "./country/countryReducer";
import searchJobs from "./searchJobs/searchJobReducer";
import searchEngines from "./searchEngines/searchEnginesReducer";
import linkDetails from "./linkDetails/linkDetailsReducer";
import auth from "./auth/authReducer";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  contact: contactReducer,
  ecommerce: ecommerceReducer,
  customise: customiseReducer,
  country: country,
  searchJobs: searchJobs,
  searchEngines: searchEngines,
  linkDetails: linkDetails,
  auth: auth,
});

export default rootReducer;