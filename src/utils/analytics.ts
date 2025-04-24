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

export const biEvent = {
  track: (eventName: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      const session = typeof window !== 'undefined' ? (window).__NEXT_DATA__?.props?.pageProps?.session : null;
      const sessionProperties = session?.user ? {
        userId: session.user.id,
        userEmail: session.user.email,
        userName: `${session.user.firstName} ${session.user.lastName}`.trim()
      } : {};
      
      const mergedProperties = { ...sessionProperties, ...properties };

      console.log('[Analytics] Tracking event:', eventName, mergedProperties);
      mixpanel.track(eventName, mergedProperties);
    } else {
      console.warn('[Analytics] Event not tracked - Missing Mixpanel token:', eventName);
    }
  },

  identify: (userId: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId);
    }
  },

  setUserProperties: (properties: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.people.set(properties);
    }
  },

  pageView: (pageName: string) => {
    if (MIXPANEL_TOKEN) {
        biEvent.track(ANALYTICS_EVENTS.PAGE_VIEW, { page: pageName });
    }
  }
};
