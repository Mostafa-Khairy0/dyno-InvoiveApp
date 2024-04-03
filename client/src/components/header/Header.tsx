// import React from 'react'
import style from "./style.module.css";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { switchMode, selectMode } from "../../store/modeSlice";

const Header = () => {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  return (
    <div className={style.header}>
      <div className={style.logoBox}>
        <div className={style.logo}></div>
      </div>
      <div className={style.other}>
        <div className={style.modeIcon} onClick={() => dispatch(switchMode())}>
          <span className="material-symbols-rounded">
            {mode?.name == "dark" ? "wb_sunny" : "dark_mode"}
          </span>
        </div>
        <div className={style.photo}>
          <img src="/man.jpeg" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Header;
