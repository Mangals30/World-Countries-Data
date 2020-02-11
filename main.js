/*Function to create the divs and displaying the countries*/ 
const displayCountries = (allCountries) =>{
    countriesDislay.textContent = ''
    divError.textContent = ''
    total = 0
    for(const country of allCountries) {
    const countryDiv = document.createElement('div')
    countryDiv.setAttribute('class','country-div')
    const flagImage = document.createElement('img')
    flagImage.setAttribute('class','flag-image')
    const name = document.createElement('p')
    name.setAttribute('class','country-name')
    const capitals = document.createElement('p')
    const lang = document.createElement('p')
    const pop = document.createElement('p')
    name.textContent = country.name
    flagImage.src = country.flag
    capitals.textContent = 'Capital:'+ ' ' + country.capital
    lang.textContent = 'Languges:'+ ' ' + country.languages
    pop.textContent = 'Population:' + ' ' + country.population
    countryDiv.appendChild(flagImage)
    countryDiv.appendChild(name)
    countryDiv.appendChild(capitals)
    countryDiv.appendChild(lang)
    countryDiv.appendChild(pop)
    countriesDislay.appendChild(countryDiv)
    total++
    totalCountries.textContent = total
}

}
/*Function to display the error message*/
const errorMessage = () => {
    countriesDislay.textContent = ''
    divError.textContent = ''
    graphWrapper.textContent = ''
    totalCountries.textContent = total
    let errorMessage = '*Please enter only alphabets'
    divError.textContent = errorMessage
    divError.style.color = 'red'
    
}
/*Function to validate the search. It calls the errorMessage()
  function if the validation fails. It displays the population statistics 
  and calls the activeOrInactiveDisplay() if the validation is passed.
  */
validateSearch = (searchValue) => {
    total = 0
    if (searchValue.length == 0) {
        searchMessage.style.display = 'none'
        const allCountries = [...countries]
        displayPopulation(allCountries)
        activeOrInactiveDisplay(searchValue)

    }
    else {

    
    if (!searchValue.match(/^[A-Za-z\s]+$/)) {
        total = 0
        divError.style.display = 'block'
        errorMessage()
        arrowUp.style.display = 'none'
    }
    else {

        const countryObjArr = searchResultArray(searchValue)
        if(countryObjArr.length == 0) {
            countriesDislay.textContent = ''
            graphWrapper.textContent = ''
            totalCountries.textContent = 0
            arrowUp.style.display = 'none'

        }
        else {
            searchMessage.style.display = 'block'
            displayPopulation(countryObjArr)
            arrowUp.style.display = 'block'
            activeOrInactiveDisplay(searchValue)
 
        }
}

}
   }

   /*Checks if the arrow button is active when the input search is conducted*/ 
   const activeOrInactiveDisplay = (searchValue) =>{
    const searchArray = searchResultArray(searchValue)
    if(nameClicked == 0 && populationClicked == 0 && capitalClicked == 0) {
        displayCountries(searchArray)
        
    } 
    else {
        if(nameClicked!=0) {
         const sortedNameArray = sortByValue(searchArray,'Name')
         displayCountries(sortedNameArray)

        }
        if(capitalClicked!=0) {
            const sortedCapitalArray = sortByValue(searchArray,'Capital')
            displayCountries(sortedCapitalArray)

           }
        if(populationClicked!=0) {
            const sortedPopulationArray = sortByValue(searchArray,'Population')
            displayCountries(sortedPopulationArray)

           }   

    }

     }  
    
    /*Function to return an array of objects based on the input entered*/
    const searchResultArray = (searchValue) => {    
    const allCountries = [...countries]
    const countryArr = []
    let reg = new RegExp(searchValue,'gi')
    for(const country of allCountries) {
            if((country.name.match(reg)) || (country.capital.match(reg)) || (country.languages.toString().match(reg))) {
             const countryObj = {}
             countryObj.name = country.name
             countryObj.capital = country.capital
             countryObj.languages = country.languages
             countryObj.population = country.population
             countryObj.flag = country.flag
             countryObj.currency = country.currency
             countryArr.push(countryObj)
        }
        
    }
    return countryArr

} 


/*Function to remove arrows of other sort buttons if any of the sort button is clicked*/
const removeArrows = (buttonText) => {
    if(buttonText == 'Name')  {
        capitalButton.innerHTML = 'Capital'
        populationButton.innerHTML = 'Population'

    }
    if(buttonText == 'Capital')  {
        nameButton.innerHTML = 'Name'
        populationButton.innerHTML = 'Population'

    }
    if(buttonText == 'Population')  {
        nameButton.innerHTML = 'Name'
        capitalButton.innerHTML = 'Capital'

    }


}
   /*Function to sort or reverse sort the searched object array based on the flag*/ 
    const sortByValue = (array,value) => {
        array.sort((a,b) => {
            if(value == 'Name') {
                  nameButton.classList.add(setArrows(nameClicked, nameButton, value)) 
                  removeArrows(value)
                   if (nameClicked %2 == 0) {   
                   if(a.name < b.name) return 1
                   if(a.name > b.name) return -1
                    return 0

                   }
                   else {    
                   if(a.name < b.name) return -1
                   if(a.name > b.name) return 1
                   return 0

                   }


            }
            if(value == 'Capital') {
                capitalButton.classList.add(setArrows(capitalClicked, capitalButton, value))
                removeArrows(value)    
                if(capitalClicked %2 == 0) {
                        if(a.capital < b.capital) return 1
                        if(a.capital > b.capital) return -1
                        return 0
                    }
                    else {
                        if(a.capital < b.capital) return -1
                        if(a.capital > b.capital) return 1
                        return 0
                    }

            }
            if(value == 'Population') {
                populationButton.classList.add(setArrows(populationClicked, populationButton, value))
                removeArrows(value)   
                if(populationClicked % 2 == 0) {
                        if(a.population < b.population) return 1
                        if(a.population > b.population) return -1
                        return 0
                    }
                    else {
                        if(a.population < b.population) return -1
                        if(a.population > b.population) return 1
                        return 0
                    }


                
            }
        })
        return array
    }

    /*Function to set the flad when a sort button is clicked*/ 
    const setFlag = value =>{
        if(value == 'Name') {
            nameClicked++
            populationClicked = 0
            capitalClicked = 0
        }
        if(value == 'Capital') {
            capitalClicked ++ 
            nameClicked = 0
            populationClicked = 0
        }
        if(value == 'Population') {
            populationClicked++
            nameClicked = 0
            capitalClicked = 0
        }

    }
   
    /*Function to set the arrows in the button when the sort button is clicked*/
    const setArrows = (buttonClicked, buttonName,buttonText) => {

        if(buttonClicked %2 == 0) {
            buttonName.innerHTML = buttonText+'<i class="fas fa-long-arrow-alt-down"></i>'
            
        }
        else {
            buttonName.innerHTML = buttonText+'<i class="fas fa-long-arrow-alt-up"></i>'
        }

        
    }
 /*Event listener for the sort buttons*/ 
 sortButtons.addEventListener('click',event => {
    let value = event.target.value
    setFlag(value)
    if(inputSearch.value.length == 0) {
        const allCountries = [...countries]
        const sortedArray = sortByValue(allCountries,value)
        displayCountries(sortedArray)
        
    }
    else {
        const countryObjArr = searchResultArray(inputSearch.value)
        const sortedArray = sortByValue(countryObjArr,value)
        displayCountries(sortedArray)
    }
    

})


/*Event listener for the search input.*/ 
inputSearch.addEventListener('keyup',event => {
    validateSearch(inputSearch.value)
})
            
/* Home Page Loading */
const allCountries = [...countries]
displayCountries(allCountries)
displayPopulation(allCountries)



        
    
