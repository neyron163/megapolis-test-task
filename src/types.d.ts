export interface ItemsType {
  id: number;
  title: string;
}

export interface DataType {
  data: Array<ItemsType>;
  success: boolean;
}

export interface Match {
  isExact: boolean;
  params: {
    id: string;
  };
  path: string;
  url: string;
}

export interface MatchType {
  match: Match;
  history: any;
}
