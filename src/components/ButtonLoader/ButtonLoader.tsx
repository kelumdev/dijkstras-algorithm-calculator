import classNames from 'classnames'
import './ButtonLoader.css'

interface ButtonLoaderProps {
  className?: string
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  className
}) => {
  const ButtonLoaderClasses = classNames(
    'btn-loader',
    className
  )

  return <span className={ButtonLoaderClasses}></span>
}

export default ButtonLoader
