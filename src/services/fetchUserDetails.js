import { account } from "@/services/appwrite";

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
        const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info from Google");
        }

        const userInfo = await response.json();
        avatarUrl = userInfo.picture; // Get the avatar URL
        await account.updatePrefs({ avatar: avatarUrl });
      }

      // Fetch the user details from Appwrite
      const user = await account.get();
      if (user) {
        // Call backend to store or fetch user and get token
        const backendResponse = await fetch(`${import.meta.env.VITE_APP_BASE_BACKEND_URL}/api/v1/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            username: user.name,
            avatar: avatarUrl,
            provider: session.provider,
            providerId: session.providerUid, // ID of the provider user (GitHub or Google)
          }),
        });

        if (!backendResponse.ok) {
          throw new Error("Failed to authenticate user with backend");
        }

        const data = await backendResponse.json();
        console.log(data);
        

        // Store the token in localStorage
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("role", data.role);

        // Log info for debug purposes
        // if (token) {
        //   console.log("New user created and authenticated:", user);
        // } else {
        //   console.log("Existing user authenticated:", user);
        // }

        return user;
      } else {
        // console.error("No user found.");
      }
    } else {
      // console.error("No active session found");
    }
  } catch (error) {
    // console.error("Failed to fetch user details", error);
  }
};

export default fetchUserDetails;
