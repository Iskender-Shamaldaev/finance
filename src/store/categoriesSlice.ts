import {createSlice} from "@reduxjs/toolkit";
import {categoriesDelete, categoriesFetch, categoryCreate, categoryUpdate} from "./categoriesThunk";
import {ICategory} from "../types";
import {RootState} from "../app/store";

interface CategoriesState {
    items: ICategory[];
    category: ICategory | null;
    fetchLoading: boolean;
    createLoading: boolean;
    updateLoading: boolean;
    deleteLoading: boolean | string;
    isModalOpen: boolean;
}

const initialState: CategoriesState = {
    items: [],
    category: null,
    fetchLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    isModalOpen: false,
}

const categoriesSlice = createSlice({
        name: 'categories',
        initialState,
        reducers: {
            openModal: (state) => {
                state.isModalOpen = true;
            },
            closeModal: (state) => {
                state.isModalOpen = false;
            },
            setCategory: (state, {payload: category}) => {
                state.category = category;
            }
        },
        extraReducers:(builder)=>  {
            builder.addCase(categoriesFetch.pending, (state) => {
                state.fetchLoading = true;
            });
            builder.addCase(categoriesFetch.fulfilled, (state, {payload: categoties}) => {
                state.fetchLoading = false;
                state.items = categoties;
            });
            builder.addCase(categoriesFetch.rejected, (state) => {
                state.fetchLoading = false;
            });

            builder.addCase(categoryCreate.pending, (state) => {
                state.createLoading = true;
            });
            builder.addCase(categoryCreate.fulfilled, (state) => {
                state.createLoading= false;
            });
            builder.addCase(categoryCreate.rejected, (state) => {
                state.createLoading= false;
            });

            builder.addCase(categoryUpdate.pending, (state) => {
                state.updateLoading = true;
            });
            builder.addCase(categoryUpdate.fulfilled, (state) => {
                state.updateLoading= false;
            });
            builder.addCase(categoryUpdate.rejected, (state) => {
                state.updateLoading= false;
            });


            builder.addCase(categoriesDelete.pending,(state, action) =>  {
                state.deleteLoading = action.meta.arg;
            });
            builder.addCase(categoriesDelete.fulfilled, (state) => {
                state.deleteLoading = false;
            });
            builder.addCase(categoriesDelete.rejected, (state) => {
                state.deleteLoading = false;
            });
        },
    }
);

export const categoriesReducer = categoriesSlice.reducer;
export const {openModal, closeModal, setCategory} = categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectDeleteCategoriesLoading = (state: RootState) => state.categories.deleteLoading;
export const selectCreateCategoriesLoading = (state: RootState) => state.categories.createLoading;
export const selectUpdateCategoriesLoading = (state: RootState) => state.categories.updateLoading;
export const selectModalOpen = (state: RootState) => state.categories.isModalOpen;


