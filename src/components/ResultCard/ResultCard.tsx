interface ResultCardProps {
  fromNode: string
  toNode: string
  nodeNames: string[]
  distance: number | undefined
}

const ResultCard: React.FC<ResultCardProps> = ({
  fromNode,
  toNode,
  nodeNames,
  distance,
}) => {
  return (
    <div className='result-card bg-[#F2F3F6] p-[32px] h-full min-h-[472px] rounded-tr-[8px] rounded-br-[8px]'>
      <p className='text-md text-color-primary mb-[16px] font-semibold'>
        Result
      </p>
      <div className='result-card-inner bg-white p-[24px] h-[364px]'>
        <p className='mb-[24px] text-sm text-[#5A5B5D]'>
          From Node Name = “{fromNode}”, To Node Name = ”{toNode}”:{' '}
          {nodeNames?.join('. ')}
        </p>
        <p className='text-sm text-[#5A5B5D]'>Total Distance: <strong>{distance}</strong></p>
      </div>
    </div>
  )
}

export default ResultCard
