import React from 'react';
import {Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
    closeModal,
    selectCategory,
    selectCreateCategoriesLoading,
    selectModalOpen, selectUpdateCategoriesLoading,
    setCategory
} from "../../store/categoriesSlice";
import CategoryForm from "../../components/Forms/CategoryForm/CategoryForm";
import {TCategoryMutation} from "../../types";
import {categoriesFetch, categoryCreate, categoryUpdate} from "../../store/categoriesThunk";

const CategoriesModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectModalOpen);
    const createLoading = useAppSelector(selectCreateCategoriesLoading);
    const upDateLoading = useAppSelector(selectUpdateCategoriesLoading);
    const category = useAppSelector(selectCategory);
    const handleClose = () => {
        dispatch(closeModal());
        dispatch(setCategory(null));
    };

    const onSubmit = async (newCategory: TCategoryMutation) => {
        const data = {
            type: newCategory.type,
            name: newCategory.name,
        }

        if (category) {
          await dispatch(categoryUpdate({
                id: category.id,
                category: data,
            }))
        } else {
            await dispatch(categoryCreate(data));
        }

        handleClose();
        await dispatch(categoriesFetch());
    }


    return (
        <Modal show={isOpen}
               onHide={handleClose}
               backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <CategoryForm
                   onSubmit={onSubmit}
                   loading={category ? upDateLoading :  createLoading}
                   onClose={handleClose}
                   category={category}
               />
            </Modal.Body>

        </Modal>
    );
};

export default CategoriesModal;