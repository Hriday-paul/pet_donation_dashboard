"use client"
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import { Button } from 'antd';
import AddTransaction from './AddTransaction';
import EarningStats from './EarningStats';

const EarningContainer = () => {
    
    
    return (
        <div>

            <EarningStats />

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-xl text-black font-medium">Transactions</h1>
                <AddTransaction />
            </div>

            <TransactionTable />

            

        </div>
    );
};

export default EarningContainer;