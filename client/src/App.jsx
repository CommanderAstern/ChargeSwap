import { useState } from 'react'
import {
  Navbar,
  Footer,
  Station,
  SearchStations,
  Dashboard,
} from "./components";

function App() {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Dashboard/>
      </div>
      <SearchStations />
      <Station />
      <Footer />
    </div>
  )
}

export default App
