import classNames from 'classnames'
import './Loader.css'

interface LoaderProps {
  className?: string
}

const Loader: React.FC<LoaderProps> = ({
  className
}) => {
  const LoaderClasses = classNames(
    'loader',
    className
  )
  return <span className={LoaderClasses}></span>
}

export default Loader
