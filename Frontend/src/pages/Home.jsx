import React from 'react'
import Biography from '../components/Biography'
import Department from '../components/Department'
import Hero from '../components/Hero'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Our Health Care Services"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  )
}

export default Home