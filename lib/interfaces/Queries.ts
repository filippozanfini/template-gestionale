export interface PageLimit {
  page: number;
  limit: number;
}

export interface PageLimitQuery extends PageLimit {
  query: string;
}

export interface PageLimitQueryStatusOrderCollab extends PageLimitQuery {
  status: string;
  orderBy: string;
  idCollab: string;
}
