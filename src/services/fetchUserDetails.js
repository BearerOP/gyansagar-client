import { account } from "@/services/appwrite";
import Path from "./path";


const fetchUserDetails = async () => {
  try {
    const session = await account.getSession("current");
    if (session) {
      const prefs = await account.getPrefs(); // Fetch user preferences
      let avatarUrl = '';

      // Handle avatar for GitHub provider
      if (session.provider === "github") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        avatarUrl = `https://avatars.githubusercontent.com/u/${session.providerUid}`;
        await account.updatePrefs({ avatar: avatarUrl });
      }

      // Handle avatar for Google provider
      else if (session.provider === "google") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const accessToken = session.providerAccessToken; // Access token for Google
        const response = await Path.get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch user info from Google");
        }

        const userInfo = response.data;
        avatarUrl = userInfo.picture; // Get the avatar URL
        await account.updatePrefs({ avatar: avatarUrl });
      }

      // Fetch the user details from Appwrite
      const user = await account.get();
      if (user) {
        // Call backend to store or fetch user and get token
        const backendResponse = await Path.post(`/api/v1/user/login`, {
          email: user.email,
          username: user.name,
          avatar: avatarUrl,
          provider: session.provider,
          providerId: session.providerUid, // ID of the provider user (GitHub or Google)
        });

        if (backendResponse.status !== 200) {
          throw new Error("Failed to authenticate user with backend");
        }

        const data = backendResponse.data;
        console.log(data);

        // Store the token in sessionStorage
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("role", data.role);

        return user;
      } else {
        console.error("No user found.");
      }
    } else {
      console.error("No active session found");
    }
  } catch (error) {
    console.error("Failed to fetch user details", error);
  }
};

export default fetchUserDetails;
