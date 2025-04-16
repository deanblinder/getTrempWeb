import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with the token from environment variables
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Debug logging for initialization
console.log('[Analytics] Initializing with token:', MIXPANEL_TOKEN ? 'Present' : 'Missing');

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

// Define interfaces for different types of event properties
interface BaseEventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

interface PageViewProperties extends BaseEventProperties {
  page: string;
}

interface UserProperties extends BaseEventProperties {
  email?: string;
  name?: string;
  profilePicture?: string;
}

// Define the type for event properties
type EventProperties = BaseEventProperties | PageViewProperties | UserProperties;

// Analytics utility functions
export const biEvent = {
  track: (eventName: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      console.log('[Analytics] Tracking event:', eventName, properties);
      mixpanel.track(eventName, properties);
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