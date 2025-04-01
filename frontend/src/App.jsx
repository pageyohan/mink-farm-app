function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-500 text-white text-center p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Hello Tailwind CSS!</h1>
        <p className="mt-2">Ceci est un test avec Vite + React + Tailwind.</p>
      </header>
      
      <button className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
        Clique-moi !
      </button>
    </div>
  );
}

export default App;