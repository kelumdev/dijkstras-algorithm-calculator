import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from '../Button'

describe('Button component', async () => {
  it('Check for disabled prop', () => {
    render(<Button disabled>Button text</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
  it('Check for appearance solid', () => {
    const { container } = render(<Button appearance='solid'>Button text</Button>)
    const button = container.querySelector('button')
    expect(button.classList.contains("bg-color-secondary")).toBe(true);
  })
  it('Check for onClick function', async () => {
    const onClick = vi.fn()
    const { container } = render(<Button appearance='solid' onClick={onClick}>Button text</Button>)
    const button = container.querySelector('button')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})