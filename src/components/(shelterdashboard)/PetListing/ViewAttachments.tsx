import { Button, Modal, Tooltip } from 'antd';
import React, { useState } from 'react'
import { BsCloudDownload } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';

function ViewAttachments({ pet_reports }: { pet_reports: string[] }) {
    const [open, setOpen] = useState(false)

    const handleDownload = (fileUrl: string, filename: string) => {
        // Create a temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                                <Button onClick={() => handleDownload(report, report.substring(report.lastIndexOf("/") + 1))} size='small' className='absolute right-5 top-5'>
                                    <BsCloudDownload />
                                </Button>
                            </div>
                        })
                    }
                </div>

            </Modal>
        </div>
    );
}

export default ViewAttachments