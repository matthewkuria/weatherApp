import { useState, useEffect, ChangeEvent } from "react";
import { optionType } from "../types";
const useForeCast =() =>{
      // create a state variable "term" to store the value of the search box
  const [term, setTerm]=useState<string>('');
  // Create a change event with the annotations as seen below
  const [city, setCity] = useState<optionType | null>(null)
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast]= useState<null>(null)

  const getSearchOptions =(value: string) =>{
     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
      process.env.REACT_APP_API_KEY}
     `)
     .then((res)=>res.json())
     .then((data)=>setOptions(data))
  }

  const onInputChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const value= e.target.value
    setTerm(value);
    
    // console.log(e.target.value);
    if(value ==='') return
    getSearchOptions(value)
    }
    const getForeCast =(city: optionType)=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric
      &appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data)=>setForecast(data))

    }
    const onSubmit= ()=>{
      if(!city) return

      getForeCast(city)
    }
    const onOptionSelect = (option:optionType) =>{
      // console.log(option.name)
      setCity(option)
      

    }
    useEffect(()=>{
if(city){
  setTerm(city.name)
  setOptions([])
}
    },[city])
    return{
        term, 
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}
export default useForeCast