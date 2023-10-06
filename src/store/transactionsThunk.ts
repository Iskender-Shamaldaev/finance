import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategoriesList, ITransaction, TTransactionApi} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch, RootState} from "../app/store";
import {categoriesFetch} from "./categoriesThunk";

export const transactionsFetch = createAsyncThunk<ITransaction[], undefined, {
    dispatch: AppDispatch,
    getState: RootState
}>(
    'transactions/fetch',
    async (_, {getState, dispatch}) => {
        await dispatch(categoriesFetch());
        const state = getState() as RootState;
        const categories = state.categories.items;

        const response = await axiosApi.get<ICategoriesList | null>('/transactions.json');
        const transactions = response.data;

        const  newTransactions: ITransaction[] = [];

        if (transactions) {
             Object.keys(transactions).forEach((id) => {
                const transaction = transactions[id];
                const transactionCategory = transaction.category;
                const existingCategory = categories.find((category) => category.id === transactionCategory);
                if (existingCategory) {
                    newTransactions.push({
                        ...transaction,
                        category: {
                            id: existingCategory.id,
                            name: existingCategory.name,
                            type: existingCategory.type,
                        },
                        id,
                    });
                }
            });
        }
        return newTransactions.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            }
            if (a.createdAt < b.createdAt) {
                return 1
            }
            return 0;
        });
    },
);


interface Params {
    transaction: TTransactionApi;
    id: string;
}

export const transactionUpdate = createAsyncThunk<void, Params>(
    'transaction/update',
    async (params) => {
        await axiosApi.put(`/transactions/${params.id}.json`, params.transaction);
    },
)


export const transactionCreate = createAsyncThunk<void, TTransactionApi>(
    'transaction/create',
    async (transaction) => {
        await axiosApi.post('/transactions.json', transaction);
    },
);