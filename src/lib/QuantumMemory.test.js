import { QuantumMemory as QM } from './QuantumMemory'
import { Repeater } from './Repeater'
describe('whatever', () => {

  // ----

  it('renders.', () => {
    const mockRepeater = { a: 'a' }
    const qm1 = new QM(mockRepeater, 1)
    const qm2 = new QM(mockRepeater, 2)
    const mockLink = { a: 'a' }
    const mockMessage = { a: 'a' }

    qm1.sendToReceivingQM(qm2, mockMessage, mockLink)

    expect(mountedComponent.contains()).toBe(true)
  })

})
