"use client"
import { HandCoins, Users } from 'lucide-react';
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import { Button } from 'antd';
import AddTransaction from './AddTransaction';

const EarningContainer = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center gap-5 flex-wrap text-text-color ">
                {/* ====================================== Today income ========================================== */}

                <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
                            <HandCoins className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-main-color text-lg font-medium">Today Income</span>
                            <span className="text-main-color text-3xl font-semibold">$500.91</span>
                        </div>
                    </div>
                </div>


                {/* ====================================== Total Vendor ========================================== */}
                <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
                            <HandCoins className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-main-color text-lg font-medium">Total Earning</span>
                            <span className="text-main-color text-3xl font-semibold">$16,070</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-xl text-black font-medium">Transactions</h1>
                <Button onClick={() => setOpen(true)} type='primary' size='large'>Add Transaction</Button>
            </div>

            <TransactionTable />

            <AddTransaction open={open} setOpen={setOpen} />

        </div>
    );
};

export default EarningContainer;