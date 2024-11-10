export interface GetCategory {
  _id: string;
  name: string;
  description?: string;
  color: string;
}

export interface CreateCategory {
  _id?: string;
  name: string;
  description?: string;
  color: string;
}
