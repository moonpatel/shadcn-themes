import { useEffect, useState } from "react";

const useStateWithReset = <T,>(initialState: T) => {
  const [value, setValue] = useState(initialState);
  const reset = () => {
    setValue(initialState);
  };
  return [value, setValue, reset] as const;
};

export default useStateWithReset;
