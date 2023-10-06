export  type ICategoryTypes = 'income' | 'expense';

export  interface ICategory {
    id: string;
    type: ICategoryTypes;
    name: string;
}

export type TCategoryMutation = Omit<ICategory, 'id'>;

export interface ICategoriesList {
    [id: string]: ICategoryApi;
}

export interface ITransaction {
    id: string;
    category: {
        id: string;
        name: string;
        type: string;
    };
    amount: number;
    createdAt: string;
}

export interface ITransactionMutation {
    category: string;
    amount: string;
    createdAt: string;
}

export interface TTransactionApi {
    category: string;
    amount: number;
    createdAt: string;
}

export interface ITransactionList {
    [id: string]: ITransactionApi;
}
