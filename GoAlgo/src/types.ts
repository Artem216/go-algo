export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  // balance: number;
};

export type Stock = {
  id: number;
  name: string;
  pr_open: number;
  pr_close: number;
};
