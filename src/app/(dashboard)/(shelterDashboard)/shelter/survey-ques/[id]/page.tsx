import SurveyDetailscontainer from '@/components/(shelterdashboard)/SurveyList/SurveyDetails/SurveyDetailscontainer';
import React from 'react';

const SurverQuesDetailsPage = async({params}:{params : Promise<{id : string}>}) => {
    const {id} = await params;
    return (
        <div>
            <SurveyDetailscontainer id={id}/>
        </div>
    );
};

export default SurverQuesDetailsPage;