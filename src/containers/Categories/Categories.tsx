import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {categoriesFetch} from "../../store/categoriesThunk";
import {openModal, selectCategories, selectFetchCategoriesLoading} from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import {ListGroup} from "react-bootstrap";
import CategoriesItem from "./CategoriesItem";
import CategoriesModal from "./CategoriesModal";

const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const fetchLoading = useAppSelector(selectFetchCategoriesLoading);

    useEffect(() => {
        dispatch(categoriesFetch());
    }, [dispatch]);

    return (
       <>
           <div className="d-flex justify-content-between align-items-center mb-3">
               <h4>Categories</h4>
               <button
                   type={"button"}
                   className="btn btn-success"
                   onClick={() => dispatch(openModal())}
               >
                   Add
               </button>
           </div>

           {
               fetchLoading
               ? <Spinner />
               : <ListGroup>
                       {categories.map((category) => <CategoriesItem key={category.id} category={category}/> )}
                   </ListGroup>
           }
           <CategoriesModal />
       </>
    );
};

export default Categories;