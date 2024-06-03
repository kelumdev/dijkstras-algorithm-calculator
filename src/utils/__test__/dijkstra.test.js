import { expect, describe, it } from 'vitest'
import {dijkstra} from '../dijkstra'

const graphState = {
  "adjacencyList": {
      "A": {
          "B": 4,
          "C": 6
      },
      "B": {
          "A": 4,
          "F": 2
      },
      "C": {
          "A": 6,
          "D": 8
      },
      "D": {
          "C": 8,
          "E": 4,
          "G": 1
      },
      "E": {
          "B": 2,
          "F": 3,
          "I": 8,
          "D": 4
      },
      "F": {
          "B": 2,
          "E": 3,
          "G": 4,
          "H": 6
      },
      "G": {
          "D": 1,
          "F": 4,
          "H": 5,
          "I": 5
      },
      "H": {
          "F": 6,
          "G": 5
      },
      "I": {
          "E": 8,
          "G": 5
      }
  },
  "vertexData": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I"
  ]
}

describe('Dijkstra Algorithm', () => {
  it('If from and to nodes are same', () => {
    expect(dijkstra(graphState, 'A', 'A')).toMatchObject({
      distance: 0,
      nodeNames: [],
    })
  })
  it('If to Node undefined', () => {
    expect(dijkstra(graphState, 'A', undefined)).toMatchObject({
      distance: undefined,
      nodeNames: [],
    })
  })
  it('If both from and to nodes are empty', () => {
    expect(dijkstra(graphState, ' ', ' ')).toMatchObject({
      distance: 0,
      nodeNames: [],
    })
  })
  it('Check for path data calculation', () => {
    expect(dijkstra(graphState, 'A', 'B')).toMatchObject({
      distance: 4,
      nodeNames: ['A', 'B'],
    })
  })
  it('Check for one direction nodes', () => {
    expect(dijkstra(graphState, 'B', 'E')).toMatchObject({
      distance: 5,
      nodeNames: ['B', 'F', 'E'],
    })
  })
})