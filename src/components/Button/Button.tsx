import React from 'react'
import classNames from 'classnames'
import calculator from '/calculator.svg'
import ButtonLoader from '../ButtonLoader/ButtonLoader'

interface ButtonProps {
  appearance?: 'solid' | 'outline'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  hasIcon?: boolean
  children: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  appearance = 'filled',
  disabled = false,
  loading = false,
  onClick,
  className,
  hasIcon = false,
  type,
  children,
}) => {
  const buttonClass = classNames(
    'flex items-center justify-center rounded-[8px] border border-color-secondary px-[16px] py-[12px] tex-md',
    {
      'text-white bg-color-secondary hover:bg-color-secondary':
        appearance === 'solid' && !disabled,
      'text-color-secondary bg-white border-color-secondary border-[1px] border-solid hover:bg-indigo-50':
        appearance === 'outline' && !disabled,
      'text-white bg-color-secondary cursor-not-allowed opacity-80':
        (appearance === 'solid' && disabled) || loading,
      'text-color-secondary cursor-not-allowed opacity-80':
        (appearance === 'outline' && disabled) || loading,
    },
    className
  )

  return (
    <button
      className={buttonClass}
      onClick={!disabled && !loading ? onClick : undefined}
      type={type}
      disabled={disabled || loading}>
      {loading && <ButtonLoader />}
      {hasIcon && !loading && (
        <span className='mr-2'>
          <img src={calculator} />
        </span>
      )}
      {!loading && children}
    </button>
  )
}

export default Button
