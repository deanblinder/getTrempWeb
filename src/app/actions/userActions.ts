interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}
export interface RideRequestsResponse {
  requests: string[];
  requestsString: string;
}

import { userServices } from "../services/userServices";

const userActions = {
  // TODO : add UserType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async (userData: any) => {
    return await userServices.createUserService(userData);
  },

  updateUser: async (userId: string, updateData: UpdateUserData) => {
    return await userServices.updateUserService(userId, updateData);
  },

  getUser: async (userId: string) => {
    return await userServices.fetchUserService(userId);
  },
  getUserRequests: async (userId: string): Promise<RideRequestsResponse> => {
    return await userServices.getUserRequestsService(userId);
  },
};

export default userActions;
