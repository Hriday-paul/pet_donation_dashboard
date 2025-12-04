"use client";
import moment from "moment";
import { Loader, LoaderCircle, Trash2 } from "lucide-react";
import { useDeleteAllNotificationsMutation, useDeleteNotificationsMutation, useNotificationsQuery } from "@/redux/api/baseApi";
import ErrorComponent from "@/utils/ErrorComponent";
import { INotification } from "@/redux/types";
import { toast } from "sonner";
import { Button, Empty } from "antd";

const NotificationContainer = () => {

  const [handledeleteNotificationByApi, { isLoading: dltLoading }] = useDeleteAllNotificationsMutation();

  const { isLoading, isError, data, isSuccess } = useNotificationsQuery({ sort: "-createdAt" });

  const handleDltAll = async () => {
    try {
      await handledeleteNotificationByApi().unwrap();
      toast.success("All Notification deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
    <Loader size={30} className='text-main-color animate-spin' />
  </div>

  if (isError) return <ErrorComponent />

  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="text-2xl text-text-color  mb-2">Notification</h1>

          <Button type="primary" onClick={handleDltAll}> {dltLoading ? <LoaderCircle className='text-white animate-spin' /> : "Delete All"}</Button>

        </div>
        <hr />


        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          {/* showing today notification */}
          <div className="space-y-5">
            {data?.data?.notifications?.map((notification, index) => (
              <Notification notification={notification} key={notification?._id} />
            ))}
            {
              isSuccess && data?.data?.notifications?.length <= 0 && <Empty />
            }
          </div>
        </div>

      </div>

    </div>
  );
};

export default NotificationContainer;

const Notification = ({ notification }: { notification: INotification }) => {

  const [handledeleteNotificationByApi, { isLoading }] = useDeleteNotificationsMutation();

  const handleMarkDelete = async (id: string) => {
    try {
      await handledeleteNotificationByApi({ id }).unwrap();
      toast.success("Notification deleted successfully")
    } catch (err: any) {
      toast.error(err?.ddata?.message || "Something went wrong, try again")
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <div
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
      <button disabled={isLoading} onClick={() => handleMarkDelete(notification?._id)} className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer disabled:cursor-not-allowed">
        {isLoading ? <LoaderCircle className='text-white animate-spin' /> : <Trash2 color="#D30000"></Trash2>}
      </button>
    </div>
  )
}
