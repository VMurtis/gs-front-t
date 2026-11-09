import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700">
          Bairro Online
        </h1>

        <p className="mt-3 text-slate-600">
          Projeto iniciado com React, TypeScript e Tailwind CSS.
        </p>
      </section>
    </main>
  )
}

export default App
