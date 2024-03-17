import { cn } from "@/lib/utils";
import { BiChevronRight } from "react-icons/bi";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const footerNavs = [
  {
    label: "Product",
    items: [
      {
        href: "#",
        name: "Features",
      },
      {
        href: "#",
        name: "Pricing",
      },
      {
        href: "#",
        name: "FAQ",
      },
      {
        href: "#",
        name: "Support",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        href: "#",
        name: "About Us",
      },
      {
        href: "#",
        name: "Blog",
      },
      {
        href: "#",
        name: "Careers",
      },
      {
        href: "#",
        name: "Contact",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        href: "#",
        name: "Documentation",
      },
      {
        href: "#",
        name: "API Reference",
      },
      {
        href: "#",
        name: "Community",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        href: "#",
        name: "Privacy Policy",
      },
      {
        href: "#",
        name: "Terms of Service",
      },
    ],
  },
];

const footerSocials = [
  {
    href: "/",
    name: "Linkedin",
    icon: <FaLinkedin className="size-4" />,
  },
  {
    href: "/",
    name: "Twitter",
    icon: <FaTwitter className="size-4" />,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="gap-4 p-4 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2">
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                Swift Debrief
              </span>
            </a>
            <div className="max-w-sm">
              <div className="z-10 mt-4 flex w-full flex-col items-start text-left">
                <h1 className="text-3xl font-bold lg:text-2xl">
                  Get started Now.
                </h1>

                <a
                  href="/"
                  className="group flex justify-center items-center mt-4 w-full bg-white text-black py-3 font-medium text-lg rounded-[2rem] px-6"
                >
                  Debrief
                  <BiChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-6">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  {nav.label}
                </h2>
                <ul className="grid gap-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="group inline-flex cursor-pointer items-center justify-start gap-1 text-gray-300 duration-200 hover:text-gray-400 hover:opacity-90 "
                      >
                        {item.name}
                        <BiChevronRight className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-gray-200/40 border-t py-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="fill-gray-300 text-gray-300 hover:fill-gray-500 hover:text-gray-500 transition-all duration-200 ease-out"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
          <span className="text-sm text-gray-200  sm:text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="/" className="cursor-pointer">
              SwiftDebrief
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
