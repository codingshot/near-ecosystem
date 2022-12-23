import {
  Calendar,
  Twitter,
  Telgram,
  Medium,
  Instgram,
  Discord,
} from "../icons";

const links = [
  {
    icon: <Discord />,
    url: "/discord",
  },
  {
    icon: <Calendar />,
    url: "/luma",
  },
  {
    icon: <Twitter />,
    url: "/twitter",
  },
  {
    icon: <Telgram />,
    url: "/telegram",
    nested_urls: [
      { title: "NYC", url: "/tg-nyc" },
      { title: "Miami", url: "/tg-mia" },
      { title: "Austin", url: "/tg-atx" },
      { title: "SF", url: "/tg-sf" },
    ],
  },
  {
    icon: <Medium />,
    url: "/blog",
  },
  {
    icon: <Instgram />,
    url: "/instagram",
  },
];

export default links;
