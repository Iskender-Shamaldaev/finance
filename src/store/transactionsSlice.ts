import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {transactionCreate, transactionsFetch} from "./transactionsThunk";
import {ITransaction} from "../types";

export interface TransactionsState {
    items: ITransaction[];
    transaction: ITransaction | null;
    fetchLoading: boolean;
    createLoading: boolean;
    isModalOpen: boolean;
}

const initialState: TransactionsState = {
    items: [],
    transaction: null,
    fetchLoading: false,
    createLoading: false,
    isModalOpen: false,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        setTransaction: (state, {payload : transaction}) => {
            state.transaction = transaction;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(transactionCreate.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(transactionCreate.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(transactionsFetch.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(transactionsFetch.fulfilled, (state, {payload:transactions}) => {
            state.fetchLoading = false;
            state.items = transactions;
        });
    },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {openModal: transactionOpenModal, closeModal: transactionCloseModal, setTransaction} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) => state.transaction.items;
export const selectTransaction = (state: RootState) => state.transaction.transaction;
export const selectTransactionCreateLoading = (state: RootState) => state.transaction.createLoading;
export const selectFetchTransactionLoading = (state: RootState) => state.transaction.fetchLoading;
export const selectIsModalOpen = (state: RootState) => state.transaction.isModalOpen;

