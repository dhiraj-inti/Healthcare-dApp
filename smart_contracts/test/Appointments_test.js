const { assert } = require("chai")

const Appointments = artifacts.require("./Appointments.sol")

require("chai")
  .use(require("chai-as-promised"))
  .should()

contract('Appointments', (accounts) => {
  let AppointmentsX

  // this would attach the deployed smart contract and its methods 
  // to the `Appointments` variable before all other tests are run


  // check if deployment goes smooth
  describe('deployment', () => {
    // check if the smart contract is deployed 
    // by checking the address of the smart contract
    it('deploys successfully', async () => {
      AppointmentsX = await Appointments.deployed()
      const address = await AppointmentsX.address

      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
    })
  })

})