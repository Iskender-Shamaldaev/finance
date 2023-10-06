import React from 'react';
import {ListGroup} from "react-bootstrap";
import {ITransaction} from "../../types";
import dayjs from "dayjs";
import {useAppDispatch} from "../../app/hook";
import {setTransaction, transactionOpenModal} from "../../store/transactionsSlice";

interface Props {
    transaction: ITransaction;
}

const TransactionItem: React.FC<Props> = ({transaction}) => {
    const dispatch = useAppDispatch();
    const getTypeColor = (): string => {
        return transaction.category.type === 'income' ? 'green' : 'red'
    };

    const getAmount = () : string => {
        return transaction.category.type === 'income'
            ? `+${transaction.amount}`
            : `-${transaction.amount}`
    }

    const handleOpenModal = () => {
        dispatch(setTransaction(transaction));
        dispatch(transactionOpenModal());
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center"
                        key={transaction.id}>
            <div>
                <span className="me-3">
                    {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                </span>
               <span>{ transaction.category.name }</span>
            </div>
            <div className="d-flex align-items-center">
                                 <span className="d-inline me-2" style={{color: getTypeColor()}}>
                                      {getAmount()}
                                 </span>

                <div>
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleOpenModal}
                    >Edit
                    </button>
                    <button
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default TransactionItem;