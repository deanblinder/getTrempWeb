import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with the token from environment variables
const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN;

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
  GOOGLE_SIGNUP_CLICKED: 'GOOGLE_SIGNUP_CLICKED'
} as const;

// Define the type for event properties
type EventProperties = Record<string, any>;

// Analytics utility functions
export const biEvent = {
  track: (eventName: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, properties);
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