interface IDevInfo {
  _id: string;
  name: string;
  github_username: string;
  avatar_url: string;
  bio: string;
  followedList: string[];
  likedPosts: string[];
  techs: string[];
}

export type { IDevInfo };
