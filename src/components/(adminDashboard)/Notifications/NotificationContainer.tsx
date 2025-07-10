"use client";
import moment from "moment";
import { Loader, Trash2 } from "lucide-react";
import { useNotificationsQuery } from "@/redux/api/baseApi";
import ErrorComponent from "@/utils/ErrorComponent";

const NotificationContainer = () => {
  const { isLoading, isError, data } = useNotificationsQuery({sort : "-createdAt"});

  if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
    <Loader size={30} className='text-main-color animate-spin' />
  </div>

  if (isError) return <ErrorComponent />

  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <h1 className="text-2xl text-text-color  mb-2">Notification</h1>
        <hr />

     
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          {/* showing today notification */}
          <div className="space-y-5">
            {data?.data?.data?.map((notification, index) => (
              <div className="flex items-center gap-x-4">
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg p-3 flex-1"
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-xl">
                      {notification?.data?.message}
                    </h5>
                    <p>{moment(notification?.createdAt).fromNow()}</p>
                  </div>
                  {/* <p className="text-gray-300">{notification?.description}</p> */}
                </div>
                {/* delete option */}
                <div className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 color="#D30000"></Trash2>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default NotificationContainer;
