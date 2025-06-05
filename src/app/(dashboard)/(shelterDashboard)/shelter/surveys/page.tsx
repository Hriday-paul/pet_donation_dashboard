import SurveyListContainer from '@/components/(shelterdashboard)/SurveyList/SurveyListContainer';
import React from 'react';

const SyrveryListPage = () => {
    return (
        <div>
            {/* <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Users</h1>
            </div> */}
            <SurveyListContainer />
        </div>
    );
};

export default SyrveryListPage;