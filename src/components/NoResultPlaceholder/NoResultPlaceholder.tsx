import noResultBG from '/noresultbg.svg'

const NoResultPlaceholder: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-full h-full md:py-[40px]'>
      <img src={noResultBG} />
    </div>
  )
}

export default NoResultPlaceholder
