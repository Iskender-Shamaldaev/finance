import React from 'react';
import Layout from "./components/Layout/Layuot";
import {Route, Routes} from "react-router-dom";
import Transactions from "./containers/Transactions/Transactions";
import './App.css';
import Categories from "./containers/Categories/Categories";
import TransactionModal from "./containers/Transactions/TransactionModal";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={(<Transactions/>)}/>

                    <Route path="/categories" element={(<Categories/>)}/>

                    <Route path="*" element={(
                        <h1>Not Found!</h1>
                    )}/>
                </Routes>
            </Layout>

            <TransactionModal/>
        </>
    );
};

export default App;
