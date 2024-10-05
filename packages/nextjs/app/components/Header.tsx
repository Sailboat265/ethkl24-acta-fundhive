import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full px-5 flex justify-between items-center py-4 shadow-md">
      <h1 className="text-2xl font-bold">FundHive</h1>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="#home" passHref>
              <a className="link">Home</a>{" "}
            </Link>
          </li>
          <li>
            <Link href="#project" passHref className="link">
              Projects
            </Link>{" "}
          </li>
          <li>
            <Link href="/createcampaign" passHref className="link">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Start a Crowdfund</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
