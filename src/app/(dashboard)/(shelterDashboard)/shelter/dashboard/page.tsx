import LatestUser from '@/components/(shelterdashboard)/dashboard/LatestUser';
import PetDonationOverviewChart from '@/components/(shelterdashboard)/dashboard/PetDonationOverviewChart';
import PetsOverviewChart from '@/components/(shelterdashboard)/dashboard/PetsOverviewChart';
import Statistic from '@/components/(shelterdashboard)/dashboard/Statistic';
import React from 'react';

const ShelterDashboard = () => {
    return (
        <div className="lg:space-y-10 space-y-5 ">
            <Statistic></Statistic>
            <div className="grid grid-cols-2 gap-5 items-center">
                <PetsOverviewChart />
                <PetDonationOverviewChart />
            </div>
            <LatestUser />
        </div>
    );
};

export default ShelterDashboard;