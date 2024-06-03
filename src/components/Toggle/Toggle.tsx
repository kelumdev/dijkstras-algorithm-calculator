import { ChangeEvent } from 'react'
import refresh from '/refresh.svg'

interface ToggleProps {
  label?: string
  checked?: boolean
  hasRefreshIcon?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  refreshClick?: () => void
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  hasRefreshIcon,
  onChange,
  refreshClick,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          checked={checked}
          onChange={onChange}
        />
        <div className='relative w-11 h-6 bg-color-gray rounded-full peer peer-focus:ring-4 peer-focus:color-secondary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[" "] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-color-secondary'></div>
        <span className='text-sm font-medium ms-3 text-color-body'>
          {label}
        </span>
      </label>
      {hasRefreshIcon && (
        <button className='flex re-calculate-random ml-[16px] cursor-pointer' onClick={refreshClick}>
          <img src={refresh} width={25} />
        </button>
      )}
    </div>
  )
}

export default Toggle
