import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { biEvent } from '@/utils/analytics';

export const useAnalytics = () => {
  const { data: session } = useSession();

  // Identify user when session changes
  useEffect(() => {
    if (session?.user?.id) {
        biEvent.identify(session.user.id);
        biEvent.setUserProperties({
        email: session.user.email,
        name: `${session.user.firstName} ${session.user.lastName}`.trim(),
        profilePicture: session.user.profilePicture
      });
    }
  }, [session]);

  return biEvent;
};