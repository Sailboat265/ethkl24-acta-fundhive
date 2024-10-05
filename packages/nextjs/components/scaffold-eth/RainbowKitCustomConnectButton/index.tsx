"use client";

// Import useScaffoldReadContract
import { useEffect, useState } from "react";
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { UserNotRegistered } from "./UserNotRegistered";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

// Assume this component exists

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(null);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        // If connected, use the contract read hook to check user registration status
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: userExists } = useScaffoldReadContract({
          contractName: "UserRegistry", // Update with your contract name
          functionName: "isUserExist",
          args: [account?.address as Address], // Use the connected wallet address as argument
        });

        // Update the state when `userExists` changes
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (userExists !== undefined) {
            setIsUserRegistered(userExists);
          }
        }, [userExists]);

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              if (isUserRegistered === false) {
                return <UserNotRegistered />;
              }

              if (isUserRegistered === true) {
                return (
                  <>
                    <div className="flex flex-col items-center mr-1">
                      <Balance address={account.address as Address} className="min-h-0 h-auto" />
                      <span className="text-xs" style={{ color: networkColor }}>
                        {chain.name}
                      </span>
                    </div>
                    <AddressInfoDropdown
                      address={account.address as Address}
                      displayName={account.displayName}
                      ensAvatar={account.ensAvatar}
                      blockExplorerAddressLink={blockExplorerAddressLink}
                    />
                    <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
                  </>
                );
              }

              // Loading state if we haven't determined whether the user is registered or not
              return <div>Loading...</div>;
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
