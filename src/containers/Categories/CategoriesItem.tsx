import React from 'react';
import {ListGroup} from "react-bootstrap";
import {ICategory} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {categoriesDelete, categoriesFetch} from "../../store/categoriesThunk";
import {openModal, selectDeleteCategoriesLoading, setCategory} from "../../store/categoriesSlice";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

interface Props {
    category: ICategory;
}

const CategoriesItem: React.FC<Props> = ({category}) => {
    const dispatch = useAppDispatch();
    const deleteCategory = useAppSelector(selectDeleteCategoriesLoading);

    const getTypeColor = (): string => {
        return category.type === 'income' ? 'green' : 'red'
    };

    const onDelete = async () => {
        if (window.confirm('Do you really want to delete this category?')) {
            await dispatch(categoriesDelete(category.id));
            await dispatch(categoriesFetch());
        }
    }

    const handleOpenModal = () => {
      dispatch(openModal());
      dispatch(setCategory(category));
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center"
                        key={category.id}>
            <div>
                {category.name}
            </div>
            <div className="d-flex align-items-center">
                                 <span className="d-inline me-2" style={{color: getTypeColor()}}>
                                      {category.type}
                                 </span>

                <div>
                    <button
                        className="btn btn-primary me-2"
                        disabled={!!deleteCategory}
                        onClick={handleOpenModal}
                    >Edit
                    </button>
                    <button onClick={onDelete}
                            className="btn btn-danger"
                            disabled={!!deleteCategory}
                    >
                        {deleteCategory && deleteCategory === category.id ? <ButtonSpinner/> : null}
                        Delete
                    </button>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default CategoriesItem;