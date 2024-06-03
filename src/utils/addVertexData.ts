export interface GraphState {
  adjacencyList: Record<string, Record<string, number>>;
  vertexData: string[];
}

const addVertexData = (vertex: number, data: string, setGraphState: React.Dispatch<React.SetStateAction<GraphState>>) => {
  setGraphState(prevState => {
    const vertexData = [...prevState.vertexData]
    vertexData[vertex] = data
    return { ...prevState, vertexData }
  })
}

export default addVertexData
