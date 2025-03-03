"use client";

import { useSession } from "next-auth/react";
import { User } from "./useUser";

export const useSessionUpdate = () => {
  const { data: session, update: updateSession } = useSession();

  const updateSessionData = async (newData: Partial<User>) => {
    if (!session) return;

    await updateSession({
      ...session,
      user: {
        ...session.user,
        ...newData,
      },
    });
  };

  return { updateSessionData, session };
};
