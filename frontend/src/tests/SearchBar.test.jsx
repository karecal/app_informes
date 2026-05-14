/**
 * @vitest-environment jsdom
 */

import '@testing-library/jest-dom'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ArtContext } from '../context/ArtContext'
import SearchBar from '../components/SearchBar/SearchBar'

describe('SearchBar', () => {
  test('permite escribir en el buscador', () => {
    const mockContext = {
      setSubmittedQuery: vi.fn()
    }

    const mockProps = {
      filters: {
        query: '',
        classification: '',
        culture: '',
        department: '',
        sort: '',
        yearFrom: '',
        yearTo: '',
        hasImage: true
      },
      onFilterChange: vi.fn(),
      onReset: vi.fn(),
      classifications: [],
      cultures: [],
      departments: []
    }

    render(
      <ArtContext.Provider value={mockContext}>
        <SearchBar {...mockProps} />
      </ArtContext.Provider>
    )

    const input = screen.getByPlaceholderText(
      'Buscar por título o autor...'
    )

    fireEvent.change(input, {
      target: { value: 'Monet' }
    })

    expect(mockProps.onFilterChange).toHaveBeenCalledWith(
      'query',
      'Monet'
    )
  })
})