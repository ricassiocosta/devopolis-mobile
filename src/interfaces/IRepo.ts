interface IRepo {
  full_name: string;
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks: number;
  stargazers_count: number;
}

export type { IRepo };
