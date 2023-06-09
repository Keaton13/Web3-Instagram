import ContractABI from './Instagram.json'
import Web3 from 'web3'

// export const address = '0x9E1C293b3d63C46B6C3414093d3b739Ea8032798' // Goerli
export const address = '0x8791FDF6076c00847Dd1bB703898b7557ce4E8b0' // Ganache


export const createContract = () => {
  const { ethereum } = window

  if (ethereum) {
    const web3 = new Web3(ethereum)

    return new web3.eth.Contract(ContractABI.abi, address)
  }
}

export const modalStyles = {
  content: {
    height: '300px',
    width: '400px',
    margin: 'auto',
    marginTop: '150px',
    display: 'flex',
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 74%)',
  },
}
