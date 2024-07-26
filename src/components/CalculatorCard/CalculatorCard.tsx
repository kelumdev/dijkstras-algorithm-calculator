import { useEffect, useState } from 'react'
import { SingleValue } from 'react-select'

import Button from '../Button/Button'
import NoResultPlaceholder from '../NoResultPlaceholder/NoResultPlaceholder'
import ResultCard from '../ResultCard/ResultCard'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import CustomSelect from '../CustomSelect/CustomSelect'
import Toggle from '../Toggle/Toggle'
import addEdge from '../../utils/addEdge'
import addVertexData from '../../utils/addVertexData'

import { getRandomNumbers } from '../../utils/getRandomNumbers'
import handleSendResult from '../../utils/SendShortestPathData'
import { dijkstra } from '../../utils/dijkstra'

import { GraphState, OptionType } from '../../types'
import { SELECT_OPTIONS } from '../../constants'

interface CalculatorCardProps {
  mode?: string
}

const CalculatorCard: React.FC<CalculatorCardProps> = () => {
  const [graphState, setGraphState] = useState<GraphState>({
    adjacencyList: {},
    vertexData: [],
  })
  const [fromSelectedOption, setFromSelectedOption] =
    useState<OptionType | null>(null)
  const [toSelectedOption, setToSelectedOption] = useState<OptionType | null>(
    null
  )

  const [mode, setMode] = useState<string>('input')
  const [fromNode, setFromNode] = useState<string>('')
  const [toNode, setToNode] = useState<string>('')
  const [isInputValidationErr, setIsInputValidationErr] =
    useState<boolean>(false)
  const [isAppSuccess, setIsAppSuccess] = useState<boolean>(false)
  const [isAppError, setIsAppError] = useState<boolean>(false)
  const [isAppDefault, setIsAppDefault] = useState<boolean>(true)
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false)
  const [isSelectDisabled, setIsSelectDisabled] = useState<boolean>(false)
  const [isClearBtnDisabled, setIsClearBtnDisabled] = useState<boolean>(false)
  const [hasRefreshIcon, setHasRefreshIcon] = useState<boolean>(false)
  const [isCalculateBtnDisabled, setIsCalculateBtnDisabled] =
    useState<boolean>(false)
  const [resultResStatus, setResultResStatus] = useState<number>()
  const [resultNodeNames, setResultNodeNames] = useState<string[]>([])
  const [resultDistance, setResultDistance] = useState<number>()

  useEffect(() => {
    addVertexData(0, 'A', setGraphState)
    addVertexData(1, 'B', setGraphState)
    addVertexData(2, 'C', setGraphState)
    addVertexData(3, 'D', setGraphState)
    addVertexData(4, 'E', setGraphState)
    addVertexData(5, 'F', setGraphState)
    addVertexData(6, 'G', setGraphState)
    addVertexData(7, 'H', setGraphState)
    addVertexData(8, 'I', setGraphState)

    addEdge('A', 'B', 4, setGraphState)
    addEdge('A', 'C', 6, setGraphState)
    // addEdge('B', 'A', 4, setGraphState)
    addEdge('B', 'F', 2, setGraphState)
    // addEdge('C', 'A', 6, setGraphState)
    addEdge('C', 'D', 8, setGraphState)
    addEdge('D', 'C', 8, setGraphState)
    addEdge('D', 'E', 4, setGraphState)
    addEdge('D', 'G', 1, setGraphState)
    addEdge('E', 'B', 2, setGraphState)
    addEdge('E', 'F', 3, setGraphState)
    addEdge('E', 'I', 8, setGraphState)
    addEdge('E', 'D', 4, setGraphState)
    addEdge('F', 'B', 2, setGraphState)
    addEdge('F', 'E', 3, setGraphState)
    addEdge('F', 'G', 4, setGraphState)
    // addEdge('F', 'H', 6, setGraphState)
    addEdge('G', 'D', 1, setGraphState)
    addEdge('G', 'F', 4, setGraphState)
    // addEdge('G', 'H', 5, setGraphState)
    addEdge('G', 'I', 5, setGraphState)
    // addEdge('H', 'F', 6, setGraphState)
    // addEdge('H', 'G', 5, setGraphState)
    addEdge('I', 'E', 8, setGraphState)
    addEdge('I', 'G', 5, setGraphState)

    console.error("Something`s wrong with the graph state")
    console.error("SyntaxError: Unexpected token 'export'")
  }, [])

  const fetchRandomNumberHandler = async () => {
    if (mode === 'random') {
      try {
        setIsCalculateBtnDisabled(true)
        setIsAppDefault(false)
        setIsAppLoading(true)

        const randomLetters = await getRandomNumbers()

        setFromNode(randomLetters?.fromNode)
        setToNode(randomLetters?.toNode)
        setFromSelectedOption({
          value: randomLetters?.fromNode,
          label: randomLetters?.fromNode,
        })
        setToSelectedOption({
          value: randomLetters?.toNode,
          label: randomLetters?.toNode,
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }
    setIsCalculateBtnDisabled(false)
    setIsAppLoading(false)
    setIsAppDefault(true)
  }

  const fetchRandomRefreshHandler = () => {
    setIsAppDefault(true)
    setIsAppSuccess(false)
    fetchRandomNumberHandler()
  }

  const calculateHandler = () => {
    if (fromNode?.trim() !== '' && toNode?.trim() !== '') {
      setIsInputValidationErr(false)
      setIsAppDefault(false)
      setIsAppLoading(true)

      const { nodeNames, distance } = dijkstra(graphState, fromNode, toNode)

      setTimeout(() => {
        handleSendResult({
          nodeNames: nodeNames,
          distance: distance,
        })
          .then(result => {
            if (result?.status === 200) {
              setResultResStatus(result?.status)
              setIsAppSuccess(true)
              setIsAppLoading(false)
              setResultNodeNames(result?.data?.parsedBody?.nodeNames)
              setResultDistance(result?.data?.parsedBody?.distance)
            }
          })
          .catch(err => {
            setResultResStatus(err?.status)
            setIsAppSuccess(false)
            setIsAppDefault(true)
            setIsAppError(true)
          })
      }, 500)
      setIsCalculateBtnDisabled(true)
    } else {
      setIsInputValidationErr(true)
    }
  }

  const handleFromChange = (newValue: SingleValue<OptionType>) => {
    setIsCalculateBtnDisabled(false)
    setIsAppDefault(true)
    setIsAppSuccess(false)
    setFromSelectedOption(newValue)
    setFromNode(`${newValue?.value}`)
  }

  const handleToChange = (newValue: SingleValue<OptionType>) => {
    setIsCalculateBtnDisabled(false)
    setIsAppDefault(true)
    setIsAppSuccess(false)
    setToSelectedOption(newValue)
    setToNode(`${newValue?.value}`)
  }

  const clearBtnHandler = () => {
    setIsAppSuccess(false)
    setIsAppError(false)
    setIsAppLoading(false)
    setIsAppDefault(true)
    setIsInputValidationErr(false)
    setIsCalculateBtnDisabled(false)
    setFromSelectedOption(null)
    setToSelectedOption(null)
    setFromNode('')
    setToNode('')
  }

  useEffect(() => {
    if (mode === 'random') {
      fetchRandomNumberHandler()
      setIsSelectDisabled(true)
      setIsClearBtnDisabled(true)
      setHasRefreshIcon(true)
    } else {
      setIsSelectDisabled(false)
      setIsClearBtnDisabled(false)
      setHasRefreshIcon(false)
    }
    setIsAppSuccess(false)
    setIsAppError(false)
    setIsAppLoading(false)
    setIsAppDefault(true)
    setIsInputValidationErr(false)
    setIsCalculateBtnDisabled(false)
  }, [mode])

  return (
    <div className='calculator-card mt-[-175px] flex flex-col justify-center items-center'>
      <div className='toggle-wrapper flex relative bg-white rounded-full px-[12px] py-[8px] max-w-[270px] justify-center mb-[24px]'>
        <Toggle
          label='Enable Random Mode'
          hasRefreshIcon={hasRefreshIcon}
          onChange={e => {
            if (e?.target?.checked === true) {
              setMode('random')
            } else {
              setMode('input')
            }
          }}
          refreshClick={fetchRandomRefreshHandler}
        />
      </div>

      <div className='w-[721px] bg-white rounded-[8px] shadow-md flex flex-col md:w-[400px]'>
        <div className='calculator-card-inner'>
          <div className='grid grid-cols-2 calculator-card-grid md:grid-cols-1'>
            <div className='calculator-card-left py-[32px] pl-[32px] pr-[24px]'>
              <h3 className='text-lg text-color-primary font-semibold mb-[24px]'>
                Select Path
              </h3>
              <div className='form-row mb-[24px] md:mb-0'>
                <CustomSelect
                  id='fromNode'
                  placeholder='Select'
                  label='From node:'
                  options={SELECT_OPTIONS}
                  value={fromSelectedOption}
                  disabled={isSelectDisabled}
                  onChange={handleFromChange}
                />
              </div>
              <div className='form-row mb-[24px]'>
                <CustomSelect
                  id='toNode'
                  placeholder='Select'
                  label='To node:'
                  options={SELECT_OPTIONS}
                  value={toSelectedOption}
                  disabled={isSelectDisabled}
                  onChange={handleToChange}
                />
              </div>
              <div className='flex items-center justify-start'>
                {mode !== 'random' && (
                  <Button
                    appearance='outline'
                    className='mr-[12px] h-[44px] w-full'
                    type='reset'
                    disabled={isClearBtnDisabled}
                    onClick={clearBtnHandler}>
                    Clear
                  </Button>
                )}
                <Button
                  appearance='solid'
                  hasIcon={true}
                  onClick={calculateHandler}
                  loading={isAppLoading}
                  disabled={isCalculateBtnDisabled}
                  className='min-w-[146px] h-[44px] w-full'>
                  {mode == 'input' ? 'Calculate' : 'Calculate Random'}
                </Button>
              </div>
              {isInputValidationErr && (
                <Message
                  label='Please select valid FROM and TO nodes.'
                  status='error'
                />
              )}
              {isAppError && (
                <Message
                  label={`Something went wrong. Status code: ${resultResStatus}`}
                  status='error'
                />
              )}
            </div>
            <div className='relative flex items-center justify-center w-full h-full calculator-card-right'>
              {isAppDefault && <NoResultPlaceholder />}
              {isAppLoading && <Loader />}
              {isAppSuccess && (
                <ResultCard
                  fromNode={fromNode}
                  toNode={toNode}
                  nodeNames={resultNodeNames}
                  distance={resultDistance}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorCard
