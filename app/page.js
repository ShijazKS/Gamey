"use client"; 
import Image from 'next/image'
import Game from './components/Game'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='header'>One Min Game :)</h1>
      <div className='MainBox'>
        <Game/>
      </div>
    </main>
  )
}
