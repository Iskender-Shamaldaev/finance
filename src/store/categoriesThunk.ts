import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ICategoriesList, ICategory, TCategoryMutation} from "../types";

export const categoriesFetch = createAsyncThunk<ICategory[], undefined>(
    'categories/fetchAll',
    async () => {
        const categoriesResponse = await axiosApi.get<ICategoriesList | null>('/categories.json');
        const categories = categoriesResponse.data;

        let newCategories: ICategory[] = [];

        if (categories) {
            newCategories = Object.keys(categories).map((id) => {
                return {...categories[id], id: id};
            });
        }
        return newCategories;
    },
);


export const categoryCreate = createAsyncThunk<void, TCategoryMutation>(
    'categories/create',
    async (category) => {
        await axiosApi.post('/categories.json', category);
    },
);

interface Params {
    category: TCategoryMutation;
    id: string;
}

export const categoryUpdate = createAsyncThunk<void, Params>(
    'categories/upDate',
    async (params) => {
        await axiosApi.put(`categories/${params.id}.json`, params.category);
    },
);

export const categoriesDelete = createAsyncThunk<void, string>(
    'categories/delete',
    async (id: string) => {
        await axiosApi.delete(`categories/${id}.json`);
    },
);