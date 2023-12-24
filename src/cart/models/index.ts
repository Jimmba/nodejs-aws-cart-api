export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'ORDERED'
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product: Product,
  count: number,
}

export type Cart = {
  id: string,
  userId: string,
  createdAt: Date,
  updatedAt: Date,
  status: CartStatuses,
  items: CartItem[],
}

export const MOCKED_PRODUCTS: Product[] = [
  {
    id: 'f745978c-34ef-4781-bfba-42af573aa829',
    title: 'title',
    description: 'description',
    price: 1,
  },
  {
    id: 'ccf93ae1-4f9c-4926-bdd9-0b2a33bf8c00',
    title: 'title2',
    description: 'description2',
    price: 2,
  },
  {
    id: '091eb995-de10-4bb3-b284-a1a1fbdab502',
    title: 'title3',
    description: 'description3',
    price: 3,
  },
  {
    id: 'ac5c422b-35d2-49a4-a414-13998609fbe4',
    title: 'title4',
    description: 'description4',
    price: 4,
  },
  {
    id: '4b2a7ae8-9da6-4413-b99a-b911a3175176',
    title: 'title5',
    description: 'description5',
    price: 5,
  },
  {
    id: '633a711d-5d12-476b-a876-33b45253af6a',
    title: 'title6',
    description: 'description6',
    price: 6,
  },
  {
    id: '249c877c-f40f-40eb-a6ea-a88064f630ec',
    title: 'title7',
    description: 'description7',
    price: 7,
  },
  {
    id: '37cce674-6fa4-4483-a94c-2824c44b2843',
    title: 'title8',
    description: 'description8',
    price: 8,
  },
  {
    id: '91661a08-fec8-40ce-841d-04c578f09511',
    title: 'title9',
    description: 'description9',
    price: 9,
  },
  {
    id: '442d0564-15e6-4893-bc38-d7224d49c636',
    title: 'title10',
    description: 'description10',
    price: 10,
  },
]

