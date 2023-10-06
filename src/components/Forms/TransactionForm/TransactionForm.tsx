import React, {useEffect, useState} from 'react';
import {ICategory, ITransaction, ITransactionMutation} from "../../../types";
import {Button, Spinner} from "react-bootstrap";
import {useAppSelector} from "../../../app/hook";
import {selectCategories} from "../../../store/categoriesSlice";

interface Props {
    onSubmit: (data: ITransactionMutation) => void;
    onClose: () => void;
    loading: boolean;
    transaction: ITransaction | null;
}

const initialState = {
    category: '',
    amount: '',
    createdAt: '',
};

const TransactionForm: React.FC<Props> = ({onSubmit, onClose, loading, transaction}) => {
    const [formState, setFormState] = useState<ITransactionMutation>(transaction ?
        {category: transaction.category.id,
            amount: String(transaction.amount),
            createdAt: transaction.createdAt,
        } :initialState
    );

    const [filterCategories, setFilterCategories] = useState<ICategory[]>([])

    const categories = useAppSelector(selectCategories);

    useEffect(()=> {
        setFilterCategories(categories.filter((category) => {
            if (transaction){
                return transaction.category.type === category.type;
            }

            return category.type === 'income'
        }));
    }, [categories, transaction]);


    const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFilterCategories(categories.filter((category) => category.type === value))
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const onForSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const obj = {
            ...formState,
            createdAt:transaction ? transaction.createdAt : (new Date()).toISOString(),
        };

        onSubmit(obj);
    };


    return (
        <form onSubmit={onForSubmit}>
            <div className="mb-3">
                <select className="form-select"
                        required
                        name="type"
                        onChange={onTypeChange}
                        defaultValue={transaction ? transaction.category.type: 'income'}
                >
                    <option value="income">
                        Income
                    </option>
                    <option value="expense">
                        Expense
                    </option>
                </select>
            </div>
            <div className="mb-3">
                <select className="form-select"
                        required
                        name="category"
                        value={formState.category}
                        onChange={onChange}
                >
                    <option value="">Select category</option>
                    {filterCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        ))}
                </select>
            </div>
            <div className="mb-3">

                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                    type="number"
                    required
                    className="form-control"
                    id="amount"
                    placeholder="Amount"
                    name="amount"
                    value={formState.amount}
                    onChange={onChange}
                />
            </div>

            <div className="d-flex justify-content-end">
                <Button
                    variant="secondary"
                    className="me-2"
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}>
                    {loading && <Spinner/>}
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default TransactionForm;