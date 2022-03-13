import React from 'react'
import loading from "../component/loading.gif"

export default function Spinner()  {
    return (
      <div className="background-overlay">
          <img src={loading} alt="loader" className="spinner" />
      </div>
    )
}