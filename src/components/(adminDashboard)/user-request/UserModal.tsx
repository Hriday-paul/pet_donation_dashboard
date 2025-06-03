import { Modal } from "antd";
import userImage from "@/assets/image/userImage.png";
import Image from "next/image";
import pdfImage from "@/assets/image/pdf.png";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};
const UserModal = ({ open, setOpen }: TPropsType) => {
  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = "path/to/yourfile.pdf'";
    link.setAttribute("download", "yourfile.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Modal centered footer={null} open={open} onCancel={() => setOpen(false)}>
      <div className=" bg-main-color rounded-md py-6 mt-8">
        <div className="flex justify-center items-center">
          <div className="relative w-[140px] h-[140px] ">
            <Image
              className="rounded-full border-4 border-white"
              src={userImage}
              alt="account image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h2 className=" text-3xl text-center text-white mt-3 font-bold">
          Dianne Russell
        </h2>
      </div>
      <div className=" grid grid-cols-2 justify-center px-16 gap-8 py-6">
        <div>
          <p className=" text-lg font-bold">Contact</p>
          <p className=" text-lg mt-[-4px]">+1 234 567 890</p>
        </div>
        <div>
          <p className=" text-lg font-bold">Email</p>
          <p className=" text-lg mt-[-4px]">info@gmail.com</p>
        </div>
        <div>
          <p className=" text-lg font-bold">User Type</p>
          <p className=" text-lg mt-[-4px]">User</p>
        </div>
        <div>
          <p className=" text-lg font-bold">Location</p>
          <p className=" text-lg mt-[-4px]">Califonia</p>
        </div>
        <div>
          <p className=" text-lg font-bold">Attach File</p>
          <div className="flex gap-x-2">
            {Array(1)
              .fill(0)
              .map((_, index) => (
                <div
                  onClick={handleDownloadFile}
                  className="bg-gray-300 cursor-pointer p-2 rounded w-fit "
                >
                  <div className="bg-primary-green p-2 rounded-full">
                    <Image src={pdfImage} alt="pdf_image"></Image>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <Card title="PDF Viewer" style={{ width: "100%", height: "500px" }}>
        <iframe
          src="path/to/your/pdf-file.pdf" // Replace with the path to your PDF
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Card> */}
    </Modal>
  );
};

export default UserModal;
