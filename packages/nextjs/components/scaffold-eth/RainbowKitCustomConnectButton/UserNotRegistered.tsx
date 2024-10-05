import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type UserData = {
  walletAddress: string;
  username: string;
  email: string;
};

export const UserNotRegistered = () => {
  const { address: connectedAddress } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("UserRegistry");

  // Initialize the form data state with the connected address
  const [userData, setUserFormData] = useState<UserData>({
    walletAddress: connectedAddress ?? "",
    username: "",
    email: "",
  });

  // Update the walletAddress when connectedAddress changes
  useEffect(() => {
    if (connectedAddress) {
      setUserFormData(prevData => ({
        ...prevData,
        walletAddress: connectedAddress,
      }));
    }
  }, [connectedAddress]);

  const handleSwitchAccount = () => {
    disconnect(); // Disconnect the current account
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserFormData({
      ...userData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await writeYourContractAsync({
        functionName: "registerUser",
        args: [userData.walletAddress, userData.username, userData.email],
      });

      // CHATGPT HELP HERE
    } catch (e) {
      console.error("Error creating user:", e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Display Connected Address */}
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row mb-6">
          <p className="font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>

        {/* Add button to switch account */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleSwitchAccount}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Wrong account? Click Me To Disconnect
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="doctor dewi"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="doctor-dewi@mail.apu.edu.my"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
