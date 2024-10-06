import Image from "next/image";
import Link from "next/link";
import PageIllustration from "./page-illustration";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";
import Avatar01 from "/public/images/avatar-01.png";
import Avatar02 from "/public/images/avatar-02.png";
import Avatar03 from "/public/images/avatar-03.png";
import Avatar04 from "/public/images/avatar-04.png";

export default function HeroHome() {
  const { address: connectedAddress } = useAccount();
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 bg-base-100">
        {/* Hero content */}
        <div className="pb-12  md:pb-20 p-10">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              A Crowdfunding & Donation Platform <br className="max-lg:hidden" />
              Be the blessing that others need.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-lg text-gray-100">
                Powered by Ethereum blockchain, integrated with Scroll, ICP, and Worldcoin for secure, scalable, and
                innovative fundraising
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center pt-2 pb-1 "
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row  items-center px-5">
                    <p className="font-medium">Connected Address:</p>
                    <Address address={connectedAddress} />
                  </div>
                  <a
                    className="btn group w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#0"
                  >
                    <span className="relative inline-flex items-center">
                      <Link href="/donation" passHref className="link">
                        Explore Project
                      </Link>
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
        </div>
      </div>
    </section>
  );
}
