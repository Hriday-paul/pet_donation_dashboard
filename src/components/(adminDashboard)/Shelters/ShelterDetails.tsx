import { IUser } from "@/redux/types";
import { Divider, Modal } from "antd";
import moment from "moment";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  userDetails: IUser
};

const ShelterDetails = ({ open, setOpen, userDetails }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}

    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium">Shelter Details</h4>
          <div
            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>

        <Image
          src={userDetails?.profile_image || "/empty-user.png"}
          alt="profile-picture"
          width={1000}
          height={1000}
          className="h-24 w-auto object-cover mx-auto my-5"
        ></Image>

        <div className="space-y-4">
          <div className="flex justify-between">
            <h4>Shelter Name :</h4>
            <p className="font-medium">{userDetails?.first_name + " " + userDetails?.last_name}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">{userDetails?.email}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Joined date :</h4>
            <p className="font-medium">{moment(userDetails?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
          </div>

          <hr />
          <div className="flex justify-between">
            <h4>Gender :</h4>
            <p className="font-medium">{userDetails?.gender}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Address :</h4>
            <p className="font-medium">{userDetails?.location}</p>
          </div>
          <hr />
        </div>
      </div>
    </Modal>
  );
};

export default ShelterDetails;
