import { useEarningsCountQuery } from '@/redux/api/earning.api'
import ErrorComponent from '@/utils/ErrorComponent';
import { HandCoins } from 'lucide-react';
import React from 'react'
import { ImSpinner3 } from 'react-icons/im';

export default function EarningStats() {
    const { data, isLoading, isError } = useEarningsCountQuery();

    return (
        <div>
            {isError && <ErrorComponent />}
            
            {!isError && <div className="flex justify-between items-center gap-5 flex-wrap text-text-color ">
                {/* ====================================== Today income ========================================== */}

                <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
                            <HandCoins className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-main-color text-lg font-medium">Today Income</span>
                            {isLoading ? <ImSpinner3 className="animate-spin size-4 text-main-color" /> : <span className="text-main-color text-3xl font-semibold">${data?.data?.todayEarnings}</span>}
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
                            {isLoading ? <ImSpinner3 className="animate-spin size-4 text-main-color" /> : <span className="text-main-color text-3xl font-semibold">${data?.data?.totalEarning}</span>}
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    )
}
