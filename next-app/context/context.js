import { createContext, useContext, useState, useEffect } from "react";
import { createContract } from "../utils/constants";
import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import { toast } from "react-toastify";
import Web3 from "web3";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userAddress, setUserAddress] = useState("");

  const { address } = useAccount();

  useEffect(() => {
    setUserAddress(truncateEthAddress(address));
  }, [address]);

  const getAllImages = async () => {};

  const uploadImage = async (imgUrl, caption) => {
    if (!address) return;
    const contract = createContract();

    try {
      const data = contract.methods.uploadImage(imgUrl, caption).send({
        from: userAddress,
        gas: 3000000,
      });

      await toast.promise(data, {
        pending: 'Uploading Image...',
        success: 'Image uploaded successfully',
        error: 'Something went wrong. Please try again later :x'
      })

    } catch (error) {
      console.error(error.message);
    }

    getAllImages();
  };

  const tipOwner = async () => {};

  return (
    <AppContext.Provider value={{ userAddress, posts, uploadImage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
