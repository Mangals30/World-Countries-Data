/*Ten or less spoken languages*/ 
const tenSpokenLanguages = (allLanguages) => {
    const allCountries = [...countries]
    const allLangArrs = allLanguages.map(country => country.languages)
   
    const allLangsArr = [].concat.apply([],allLangArrs)
    
    const langSet = new Set (allLangsArr)
    const uniqueLang = Array.from(langSet)
    
    const langCount =[]
    for (const lang of uniqueLang) {
        let counter =0
        for (const country of allCountries) {
            if(country.languages.includes(lang)) {
                counter ++
            }
        }
        langCount.push({language : lang, counts: counter})
    }
    langCount.sort((a,b) => {
        if (a.counts < b.counts) return 1
        if (a.counts > b.counts) return -1
        return 0
    })
    const tenLang = langCount.slice(0,10)
    return (tenLang)
    }
   
    
    /*Ten or less populated countries*/ 
    const tenPopulatedCountries = countries => {
        const populationObj = []
        populationArr = countries.map(country => country.population)
        populationArr.sort((a,b) => a-b)
        populationArr.reverse()
        const tenPopulatedArr = populationArr.slice(0,10)
        for (const population of tenPopulatedArr) {
            for (const country of countries) {
                if(country.population == population) {
                     populationObj.push({country:country.name, population:country.population})
                }
            }
        }
        return populationObj
    }
    /*Function to calculate the total population of the world*/
    const getTotalPopulation = countries => {
        const popArray = countries.map(country => country.population)
        const sumOfPop = popArray.reduce((accum,current) => accum + current)
        return sumOfPop
    
    }
    
    /*Function to get the width of the div of the population graph*/ 
    const getPopWidth = (population) => {
        const totalPopulation = getTotalPopulation(countries)
        const totalWidth = 50
        const width = (population * totalWidth) / totalPopulation
        return width
    }

    /*Function to get the width of the div of the language graph*/ 
    const getLangWidth = number => {
        const totalNumber = 100
        const totalWidth = 30
        const width = (number * totalWidth) / totalNumber
        return width
    
    }
    
    /*Function to create the statis tics of the 'World' text and the total population*/ 
    const createWorldDiv = (totalPop) => {
        const worldDiv = document.createElement('div')
        const worldDiv1 = document.createElement('div')
        const world = document.createElement('div')
        const worldDiv2 = document.createElement('div')
        worldDiv.setAttribute('class','worldDiv')
        worldDiv1.setAttribute('class','worldDiv1')
        world.setAttribute('class','world')
        worldDiv2.setAttribute('class','worldDiv2')
        worldDiv1.textContent = 'World'
        worldDiv2.textContent = totalPop
        worldDiv.appendChild(worldDiv1)
        worldDiv.appendChild(world)
        worldDiv.appendChild(worldDiv2)
        graphWrapper.appendChild(worldDiv)

    }

    /*Function to create the divs for both population and languages*/
    const createDivs = (array,value) => {
        for (const element of array) {
            const mainDiv = document.createElement('div')
            mainDiv.setAttribute('class','mainDiv')
            mainDiv.style.display = 'flex'
            const div1 = document.createElement('div')
            const subDiv = document.createElement('div')
            const div2 = document.createElement('div')
            const div3 = document.createElement('div')
            div1.setAttribute('class','div1')
            subDiv.setAttribute('class','subDiv')
            div2.setAttribute('class','div2')
            div3.setAttribute('class','div3')
            if(value == 'languages') {
                let language= element.language
                let number = element.counts
                div3.style.width = getLangWidth(number) + 'rem'
                div1.textContent = language
                div2.textContent = number
            }
            if(value == 'population') {
                let country= element.country
                let population = element.population
                div3.style.width = getPopWidth(population) + 'rem'
                div1.textContent = country
                div2.textContent = population

            }
            subDiv.appendChild(div3)
            mainDiv.appendChild(div1)
            mainDiv.appendChild(subDiv)
            mainDiv.appendChild(div2)
            graphWrapper.appendChild(mainDiv)
        }
    }
    
    /*Function to display the population graph*/ 
    const displayPopulation = (allCountries,value = 'population') => {
        feedBack.textContent = 'World Population'
        const populatedArr = tenPopulatedCountries(allCountries)
        const totalPop = getTotalPopulation(countries)
        graphWrapper.textContent = ''
        createWorldDiv(totalPop)
        createDivs(populatedArr,value)
    }
    
    /*Function to display the language graph*/ 
    const displayLanguages = (allCountries,value = 'languages') => {
        feedBack.textContent = 'Languages'
        const languageArr = tenSpokenLanguages(allCountries)
        graphWrapper.textContent = ''
        createDivs(languageArr,value)
    }
    
    /*Event listener for statistics button*/ 
    statButtons.addEventListener('click',event => {
        const allCountries = [...countries]
        let value = event.target.value
               if(value == 'population') {
           
            if (inputSearch.value.length == 0) {
                displayPopulation(allCountries,value)
                //document.location.hash = ''
            }
            else {
             const countryObjArr = searchResultArray(inputSearch.value)
             displayPopulation(countryObjArr)
            }

        }
        else if(value == 'languages') {
            
        if(inputSearch.value.length ==0) {
            displayLanguages(allCountries,value)
        }
        else {
            const countryObjArr = searchResultArray(inputSearch.value)
            displayLanguages(countryObjArr)
        }    

        }

    })