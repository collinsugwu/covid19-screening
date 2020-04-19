import "bootstrap";
import "regenerator-runtime/runtime.js";

import "./styles/main.scss";
import "./ui/countries";
import "./ui/graph";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { all } from "./api";
import { numberFormat } from "./helpers";

// const div = React.createElement('div',null,'The number are here')

const Label = ({ classlist, type, count }) => {
  return (
    <label className={`alert col alert-${classlist}`}>
      {type} <br/><span className={`badge badge-${classlist}`}>{count}</span>
    </label>
  );
};
const NumberLabels = () => {
  const [state, setState] = useState({
    cases: 0,
    deaths: 0,
    recovered: 0,
    loading: true,
  });
  useEffect(() => {
    (async function () {
      const allData = await all();
      console.log(allData);
      setState({
        cases: allData.cases,
        deaths: allData.deaths,
        recovered: allData.recovered,
        loading: false,
      });
    })();
  });
  return state.loading ? (
    <><div className="row"><div className="col text-center">Loading...</div></div></>
  ) : (
    <>
      <Label
        classlist="success"
        type="Confirmed"
        count={numberFormat(state.cases)}
      />
      <Label
        classlist="danger"
        type="Deaths"
        count={numberFormat(state.deaths)}
      />
      <Label
        classlist="info"
        type="Recovered"
        count={numberFormat(state.recovered)}
      />
    </>
  );
};
render(<NumberLabels />, document.getElementById("numbers"));
