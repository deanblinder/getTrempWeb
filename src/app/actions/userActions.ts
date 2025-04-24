interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface Request {
  userId: string;
  timestamp: number;
}
export interface RideRequestsResponse {
  requests: Request[];
}

import { ANALYTICS_EVENTS, biEvent } from "@/utils/analytics";
import { userServices } from "../services/userServices";

const userActions = {
  // TODO : add UserType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async (userData: any) => {
    biEvent.track(ANALYTICS_EVENTS.CREATE_USER, {userData})
    return await userServices.createUserService(userData);
  },

  updateUser: async (userId: string, updateData: UpdateUserData) => {
    biEvent.track(ANALYTICS_EVENTS.UPDATE_USER, {updateData})
    return await userServices.updateUserService(userId, updateData);
  },

  getUser: async (userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.FETCH_USER, {userId})
    return await userServices.fetchUserService(userId);
  },
  getUserRequests: async (userId: string): Promise<RideRequestsResponse> => {
    biEvent.track(ANALYTICS_EVENTS.FETCH_USER_REQUETS, {userId})
    return await userServices.getUserRequestsService(userId);
  },
};

export default userActions;
