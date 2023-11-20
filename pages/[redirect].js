import { useEffect } from "react";
import Layout from "../components/Layout";

const RedirectLinks = {
  "/code": "https://github.com/codingshot/near-ecosystem",
  "/live": "https://lu.ma/rug",
  "/zoom": "https://us02web.zoom.us/meeting/register/tZMoceuhpjMvGtIyU6xUrGh0SqwTHDi1RbZP",
  "/curate": "https://t.me/+6GOeraoJBnA2YzIx",
  "/list": "",
};

const Redirect = () => {
  useEffect(() => {
    const url = RedirectLinks[window.location.pathname];
    if (url) {
      window.location.href = url;
    } else if (
      window.location.pathname === window.location.pathname.toLowerCase()
    ) {
      // Route is already lowercase but matched catch all
      // page not found, display 404
      window.location.href = "/";
    } else {
      window.location.href = window.location.pathname.toLowerCase();
    }
  }, []);

  return <Layout />;
};
export default Redirect;
