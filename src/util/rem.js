import { useEffect } from "react";

function RemSet() {
  const baseSize = 10;
  function setRemFc() {
    const scale = document.documentElement.clientWidth / 1920;
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
  }
  setRemFc();
  useEffect(() => {
    window.onresize = function () {
      setRemFc();
    };
  }, []);
  return null;
}
export { RemSet };
