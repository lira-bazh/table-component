import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadData,
  changeSizePortion,
  setFindArray,
  updateData,
} from "../redux/reducers/table";
import "./settings.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const dataBase = useSelector((s) => s.table.availableData);
  const sizePortion = useSelector((s) => s.table.sizePortionToLoad);
  const startNum = useSelector((s) => s.table.startNumData);

  const clickUpdate = (event) => {
    event.preventDefault()
    dispatch(updateData(startNum, sizePortion));
  }

  const searchText = (event) => {
    if (event.target.value !== "") {
      dispatch(
        setFindArray(
          dataBase.map((item) => {
            if (item.title.includes(event.target.value)) {
              return item.id;
            }
          })
        )
      );
    }
    else {
      dispatch(setFindArray([]));
    }

  };

  const changePortion = (event) => {
    dispatch(changeSizePortion(event.target.value));
    dispatch(uploadData(startNum, event.target.value));
  };

  return (
    <div className="settings">
      <button className="settings-update" onClick={clickUpdate}>
        Обновить данные
      </button>
      <div className="settings-search">
        <input
          type="search"
          onChange={searchText}
          placeholder="Поиск по названию..."
        />
      </div>
      <div className="settings-portion">
        <input type="number" onChange={changePortion} value={sizePortion} />
      </div>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
