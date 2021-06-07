import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import MainTable from "./features/MainTable/MainTable";
import { addCoin } from "./features/MainTable/MainTableSlice";
import { Formik } from "formik";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="header"></div>
      <div className="main">
        <Formik
          initialValues={{ coinName: "", quantity: "", startPrice: "" }}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            dispatch(addCoin(values));
          }}
        >
          {({
            // values,
            // errors,
            // touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="coinName"
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.coinName}
              />
              {/* {errors.email && touched.email && errors.email} */}
              <input
                type="text"
                name="quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.quantity}
              />
              {/* {errors.password && touched.password && errors.password} */}
              <input
                type="text"
                name="startPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.startPrice}
              />
              {/* {errors.password && touched.password && errors.password} */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
        <MainTable />
      </div>
    </div>
  );
}

export default App;
