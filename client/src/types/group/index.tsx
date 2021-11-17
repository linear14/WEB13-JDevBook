export interface IProblem {
  idx: number;
  groupidx: number;
  question: string;
  answer: boolean;
}

export interface IGroup {
  idx: number;
  title: string;
  description: string;
  cover: string;
}
