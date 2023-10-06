import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {transactionsFetch} from "../../store/transactionsThunk";
import Spinner from "../../components/Spinner/Spinner";
import {ListGroup} from "react-bootstrap";
import {selectFetchTransactionLoading, selectTransactions} from "../../store/transactionsSlice";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const fetchLoading = useAppSelector(selectFetchTransactionLoading);
    const transactions = useAppSelector(selectTransactions);

    useEffect(() => {
        dispatch(transactionsFetch());
    }, [dispatch]);

    const total = transactions.reduce((acc, currentValue) => {
        if (currentValue.category.type === 'income'){
            return acc + currentValue.amount;
        }

        return  acc - currentValue.amount;
    }, 0);

    return (
        <>
            <strong>Total: { total }</strong>
            <div>
                {
                    fetchLoading
                        ? <Spinner />
                        : <ListGroup>
                            {transactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction}/> )}
                        </ListGroup>
                }
            </div>
        </>

    );
};

export default Transactions;