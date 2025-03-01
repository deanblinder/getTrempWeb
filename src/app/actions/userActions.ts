interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

const userActions = {
  // TODO : add UserType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async (userData: any) => {
    const response = await fetch("/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to set user");
    }

    return await response.json();
  },

  updateUser: async (userId: string, updateData: UpdateUserData) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  },

  getUser: async (userId: string) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  },
};

export default userActions;
