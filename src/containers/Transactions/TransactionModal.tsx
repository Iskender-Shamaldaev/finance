import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
    selectIsModalOpen,
    selectTransaction,
    selectTransactionCreateLoading,
    transactionCloseModal
} from "../../store/transactionsSlice";
import {Modal} from "react-bootstrap";
import TransactionForm from "../../components/Forms/TransactionForm/TransactionForm";
import {ITransactionMutation} from "../../types";
import {transactionCreate, transactionsFetch, transactionUpdate} from "../../store/transactionsThunk";
import {useLocation, useNavigate} from "react-router-dom";

const TransactionModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const transaction = useAppSelector(selectTransaction);


    const isOpen = useAppSelector(selectIsModalOpen);
    const createLoading = useAppSelector(selectTransactionCreateLoading);


    const handleClose = () => {
        dispatch(transactionCloseModal());
    };

    const onSubmit = async (data: ITransactionMutation) => {

        const obj = {
            ...data,
            amount: parseInt(data.amount),
        }
        if (transaction){
            await dispatch(transactionUpdate({
                transaction: obj,
                id: transaction.id,
            }));
        } else {
            await dispatch(transactionCreate(obj));
        }

        handleClose();

        if (location.pathname === '/') {
            dispatch(transactionsFetch());
        } else {
            navigate('/');
        }
    };


    return (
        <Modal show={isOpen}
               onHide={handleClose}
               backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <TransactionForm
                    onSubmit={onSubmit}
                    onClose={handleClose}
                    loading={createLoading}
                    transaction={transaction}
                />
            </Modal.Body>

        </Modal>
    );
};

export default TransactionModal;