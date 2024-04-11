
import Search from "./components/Search";
import useForeCast from "./hooks/UseForeCast";

const App = ():JSX.Element => {
const{
  term, 
  options,
  forecast,
  onInputChange,
  onOptionSelect,
  onSubmit
} = useForeCast()
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
     {forecast ?(
      "We Have a forecast!"
     ):(
      <Search
      term={term} 
      options={options} 
      onOptionSelect={onOptionSelect} 
      onInputChange={onInputChange} 
      onSubmit={onSubmit} 
      />
     )}
    </main>
  )
}

export default App
