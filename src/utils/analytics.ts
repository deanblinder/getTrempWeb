import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with the token from environment variables
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Initialize the Mixpanel instance
if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage'
  });
}

// Define common event names as constants to maintain consistency
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'PAGE_VIEW',
  GOOGLE_SIGNUP_CLICKED: 'GOOGLE_SIGNUP_CLICKED',
  SEARCH_RIDE: "SEARCH_RIDE",
  NAVIGATION_PRESS: "NAVIGATION_PRESS",
  MOBILE_NAVIGATION_PRESS: "MOBILE_NAVIGATION_PRESS",
  ADD_RIDE: "ADD_RIDE",
  UPDATE_RIDE: "UPDATE_RIDE",
  REQUEST_RIDE: "REQUEST_RIDE",
  DELETE_RIDE: "DELETE_RIDE",
  APPROVE_RIDE_REQUEST: "APPROVE_RIDE_REQUEST",
  REMOVE_PASSANGER: "REMOVE_PASSANGER",
  REMOVE_RIDE_REQUEST: "REMOVE_RIDE_REQUEST",
  FETCH_RIDE: "FETCH_RIDE",
  FETCH_USER_RIDES: "FETCH_USER_RIDES",
  FETCH_USER_REQUESTS: "FETCH_USER_REQUESTS",
  CREATE_USER: "CREATE_USER",
  UPDATE_USER: "UPDATE_USER",
  FETCH_USER: "FETCH_USER",
  FETCH_USER_REQUETS: "FETCH_USER_REQUETS",
} as const;


type EventProperties = {
    [key: string]: unknown;
};

// Type for user session data
type UserSessionData = {
  id?: string;
  email?: string;
  name?: string;
} | null;

// Store current user session data
let currentUserSession: UserSessionData = null;

export const biEvent = {
  track: (eventName: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      const eventProperties = {
        ...properties,
        userId: currentUserSession?.id,
        userEmail: currentUserSession?.email,
      };
      mixpanel.track(eventName, eventProperties);
    } else {
      console.warn('[Analytics] Event not tracked - Missing Mixpanel token:', eventName);
    }
  },

  identify: (userId: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId);
      // Update current user session when identifying
      currentUserSession = { id: userId, email: currentUserSession?.email };
    }
  },

  setUserProperties: (properties: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.people.set(properties);
      // Update email in current session if provided
      if (properties.email) {
        currentUserSession = { ...currentUserSession, email: properties.email as string };
      }
    }
  },

  pageView: (pageName: string) => {
    if (MIXPANEL_TOKEN) {
        biEvent.track(ANALYTICS_EVENTS.PAGE_VIEW, { page: pageName });
    }
  }
};
