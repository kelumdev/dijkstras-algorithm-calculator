import React from 'react'
import CN from 'classnames'

interface MessageProps {
  label: string
  status?: string
}

const Message: React.FC<MessageProps> = ({ label, status }) => {
  return (
    <div
      className={CN(
        'error-message mb-[8px] p-[10px] rounded-sm border-[1px] mt-[12px]',
        {
          'bg-red-50 border-red-200': status === 'error',
          'bg-green-50 border-green-200': status === 'success',
        }
      )}>
      <p
        className={CN('text-[13px] text-center', {
          'text-red-800': status === 'error',
          'text-green-800': status === 'success',
        })}>
        {label}
      </p>
    </div>
  )
}

export default Message
