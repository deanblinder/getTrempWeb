"use client";

import { useState, useEffect } from "react";
import userActions from "../actions/userActions";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  profilePicture?: string;
  name?: string;
}

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    const data = await userActions.getUser(userId);
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, isLoading };
};
