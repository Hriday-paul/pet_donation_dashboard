import { useDownloadAttachmentMutation } from '@/redux/api/baseApi';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react'
import { BsCloudDownload } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';
import { toast } from 'sonner';

function ViewAttachments({ pet_reports }: { pet_reports: string[] }) {
    const [open, setOpen] = useState(false)
    const [downloadFile, { }] = useDownloadAttachmentMutation();

    const handleDownload = async (fileUrl: string) => {
        try {
            const blob = await downloadFile({ url: fileUrl }).unwrap();

            const fileName = fileUrl.split('/').pop() || 'download';

            const link = document.createElement('a');
            const urlBlob = window.URL.createObjectURL(blob);

            link.href = urlBlob;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (err: any) {
            console.log(err)
            toast.error(err?.data?.message || "Something went wrong, try again");
        }
    };


    return (
        <div>
            <Tooltip title="View Attachments">
                <Button size='small' onClick={() => setOpen(true)}>
                    <FaFileAlt />
                </Button>
            </Tooltip>


            <Modal
                open={open}
                footer={null}
                // centered={true}
                onCancel={() => setOpen(false)}
                title="Attachments"
            // closeIcon={false}
            >

                <div className='space-y-5 w-full'>
                    {
                        pet_reports?.map(report => {
                            return <div className='p-10 border border-gray-200 rounded flex flex-col justify-center relative'>
                                <FaFileAlt className='text-5xl' />
                                <p className="mt-2.5">
                                    {report.substring(report.lastIndexOf("/") + 1)}
                                </p>

                                {/* onClick={() => handleDownload(report, report.substring(report.lastIndexOf("/") + 1))} */}

                                {/* <a href={report} download={true}> */}
                                <Button onClick={() => handleDownload(report)} size='small' className='absolute right-5 top-5'>
                                    <BsCloudDownload />
                                </Button>
                                {/* </a> */}
                            </div>
                        })
                    }
                </div>

                {pet_reports?.length == 0 && <div className='min-h-60 flex justify-center items-center'>
                    <Empty />
                </div>}

            </Modal>
        </div>
    );
}

export default ViewAttachments