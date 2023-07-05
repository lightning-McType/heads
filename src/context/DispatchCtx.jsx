/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { setCols, setSearch } from "../redux/actions/imageActions";

export const Ctx = createContext();

export default function DispatchCtx({ children }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    switch (e.target.name) {
      case "search":
        dispatch(setSearch(e.target.value));
        break;

      case "cols":
        dispatch(setCols(e.target.value));
        break;
    }
  };
  return <Ctx.Provider value={handleChange}>{children}</Ctx.Provider>;
}
