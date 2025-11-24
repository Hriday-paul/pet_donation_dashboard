export type IUser = {
    "first_name": string,
    "last_name": string,
    "gender": string,
    "email": string,
    "role": "shelter" | "admin",
    "location": string,
    address: {
        type: "Point",
        coordinates: number[]
    },
    "isDeleted": boolean,
    "isVerified": boolean,
    "isActive": boolean,
    "contact_number"?: string
    "_id": string,
    profile_image?: string,
    "createdAt": "2025-07-06T06:40:09.654Z",
    "updatedAt": "2025-07-06T06:40:09.654Z",
    "__v": 0,
    webLink?: string
}

export type TService = {
    "_id": string,
    "name": string,
    "icon": string,
    "isActive": boolean,
}

export type TSubService = {
    "_id": string,
    "web_name": string,
    "web_link": string,
    "web_img": string,
    "pet_type": "cat" | "dog" | "both",
    "description": string,
    "location": string,
    "service": string,
    "serviceName": string,
    position: number
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}

export interface IEarning {
    "_id": string,
    "clientName": string,
    "amount": number,
    "transactionDate": string,
    "createdAt": string,
}

export interface IMonth {
    "January": 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 16,
    "August": 0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0
}

export interface IAdminStats {
    "totalUser": number,
    "totalShelter": number,
    "totalPet": number,
}


export interface IPet {
    "_id": string,
    "full_name": string,
    "pet_image": string[],
    "location": { type: "Point", coordinates: [number, number] },
    "description": string,
    "neutered": string,
    "vaccinated": string,
    "weight": string,
    chipped: string,
    chip_number: string;
    "breed": string,
    "gender": string,
    date_of_birth: Date,
    "owner": string,
    "pet_category": string,
    "service": string,
    "serviceName": string,
    "createdAt": string,
    "updatedAt": string,

    pet_status?: 'adopted' | 'deceased' | 'in quarantine' | 'reserved' | "available";
    medical_notes?: string;
    pet_reports: string[];
    internal_notes?: string;

    city: string,
    address: string,
}

export interface ISurvey {
    "_id": string,
    "shelter_owner": string,
    "question": string,
    "priority": string
}

export interface ISurveyAnswers {
    _id: string,
    adopted_pet: IPet,
    adopter: IUser,
    answers: { question: string, answer: string, _id: string }[],
    status: "accepted" | "rejected" | "pending"
}

export interface INotification {
    ownerId: IUser,
    _id: string
    "key": string,
    "data": {
        "message": string
    },
    "receiverId": [
        string
    ],
    "notifyAdmin": boolean,
    "isRead": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": 0
}