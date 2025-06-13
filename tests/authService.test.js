import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { loginClient, loginSupplier } from '../src/services/authService.js'

vi.mock('axios')

describe('authService', () => {
  it('loginClient retorna usuario en éxito', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1 }] })
    const result = await loginClient('test@example.com', '123')
    expect(result).toEqual({ success: true, user: { id: 1 } })
  })

  it('loginSupplier maneja error de servidor', async () => {
    axios.get.mockRejectedValue(new Error('fail'))
    const result = await loginSupplier('12345678901', 'test@example.com', '123')
    expect(result).toEqual({ success: false, message: 'Error del servidor.' })
  })
})
