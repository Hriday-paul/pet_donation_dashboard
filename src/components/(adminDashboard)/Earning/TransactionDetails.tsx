import { Divider, Modal } from "antd";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const TransactionDetails = ({ open, setOpen }: TPropsType) => {
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
          <h4 className="text-center text-xl font-medium">Transaction Details</h4>
          <div
            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>

        <Image
          src={"/user-profile.png"}
          alt="profile-picture"
          width={1000}
          height={1000}
          className="h-24 w-auto object-cover mx-auto my-5"
        ></Image>

        <div className="space-y-4">
          <div className="flex justify-between">
            <h4>Name :</h4>
            <p className="font-medium">James Tracy</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Transaction ID :</h4>
            <p className="font-medium">#123456</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Transacton Date :</h4>
            <p className="font-medium">11 April 2025, 10:22 AM</p>
          </div>

          <hr />
          <div className="flex justify-between">
            <h4>Transaction amount :</h4>
            <p className="font-medium">$100</p>
          </div>
          <hr />
          
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetails;
