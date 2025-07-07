import React from 'react';

import Image from 'next/image';
import WebCardsContainer from '@/components/(adminDashboard)/Services/WebCards/WebCardsContainer';

const ServiceDetails = async({params}:{params : Promise<{id : string}>}) => {

    const {id} = await params;

    return (
        <div className=''>
            <WebCardsContainer serviceId={id} />
        </div>
    );
};

export default ServiceDetails;