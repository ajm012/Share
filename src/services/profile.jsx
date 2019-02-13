import {
  getJSON
} from "./network";

import GetProfile from "../assets/data/getProfile.json";

let cachedProfile;

export default {
  async retrieveOrCreateProfile() {
    if (cachedProfile) {
      return cachedProfile;
    }
    let profile = await getJSON("profile", GetProfile);
    cachedProfile = profile;
    return profile;
  },

  async addToProfile(key, value) {
    let profile = await this.retrieveOrCreateProfile();
    profile[key] = value;
    return profile;
  },
};