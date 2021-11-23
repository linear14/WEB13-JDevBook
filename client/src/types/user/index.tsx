export interface SolvedRates {
  prevRate: number;
  solvedRate: number;
  totalProblemsCount: number;
}

export interface IProfile {
  idx: number;
  nickname: string;
  cover: string | null;
  bio: string | null;
}
