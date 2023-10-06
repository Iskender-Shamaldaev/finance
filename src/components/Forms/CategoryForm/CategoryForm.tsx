import React, {useState} from 'react';
import {Button, Spinner} from "react-bootstrap";
import {ICategory, TCategoryMutation} from "../../../types";

interface Props {
    onSubmit: (category: TCategoryMutation) => void;
    onClose: () => void;
    loading: boolean;
    category: ICategory | null;
}

const CategoryForm: React.FC<Props> = ({onSubmit, loading, onClose, category}) => {
    const [formState, setFormState] = useState<TCategoryMutation>(category || {
        type: 'income',
        name: '',
    });

    const onForSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      onSubmit(formState);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };



    return (
        <form onSubmit={onForSubmit}>
            <div className="mb-3">
                <select className="form-select"
                        required
                        name="type"
                        value={formState.type}
                        onChange={onChange}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={formState.name}
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
                    {loading && <Spinner />}
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;