"use client"; 
import Image from 'next/image'
import Game, { MbCtrl } from './components/Game'
import ScoreBoard from './components/ScoreBoard';

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Game/>
      {/* <ScoreBoard/> */}
    </main>
  )
}
