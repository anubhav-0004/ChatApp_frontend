import moment from 'moment';
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features';
import RanderAttachments from './RanderAttachments';

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();
  return (
    <div className='max-md:bg-[#514f4f] max-w-[90%] bg-[#7b7a7a] border border-zinc-400 rounded-md px-1 py-[0.1rem] my-1 w-fit' style={{ alignSelf: sameSender ? "flex-end" : "flex-start" }}>
      {
        !sameSender && (
            <p className='text-[#fdb6b6] text-sm font-semibold'>{sender?.name}</p>
        )
      }
      {content && <div className=' text-base text-[#f9e193]'>{content}</div>}
      {
        attachments.length > 0 && (
            attachments.map((attachment, index) =>{
                const url = attachment.url;
                const file = fileFormat(url);
                return(
                    <div key={index} className='flex items-center gap-x-1 justify-center'>
                        <a href="" target='_blank' download style={{ color: "black"}}>{RanderAttachments(file, url)}</a>
                    </div>
                )
            })
        )
      }
      { createdAt && <p className='text-[#c5c4c1] text-xs w-full text-end'>{timeAgo}</p>}
    </div>
  )
}

export default memo(MessageComponent) 
