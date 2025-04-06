export interface Rate {
  currency: string;
  description: string;
  rate: number;
}

export interface ForeignExchange {
  date: string;
  rates: Rate[];
}

export interface Product {
  name: string;
  price: number;
  expiration_date: string;
  foreign_exchange?: ForeignExchange;
} 