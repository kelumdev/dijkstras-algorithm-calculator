export interface GraphState {
  adjacencyList: Record<string, Record<string, number>>;
  vertexData: string[];
}

const addEdge = (u: string, v: string, weight: number, setGraphState: React.Dispatch<React.SetStateAction<GraphState>>) => {
  setGraphState(prevState => {
    const adjacencyList = { ...prevState.adjacencyList }
    if (!adjacencyList[u]) {
      adjacencyList[u] = {}
    }
    adjacencyList[u][v] = weight
    return { ...prevState, adjacencyList }
  })
}

export default addEdge
