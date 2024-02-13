document.body.setAttribute("class","bg-primary-subtle");                 // create a set attribute to set the background color

let container = document.createElement('div');                           // creating a container div
container.setAttribute('class','container');                             //  setting the class attribute to 'container' and adding other classes as well
document.body.append(container);                                         //  appending the container to body of HTML file
container.style.textAlign ='center';                                     //   aligning the text to center

let row = document.createElement('div');                                 //  creating the div for row
row.setAttribute('class','row row-cols-lg-4 row-cols-sm-12 g-4');        //  setting the class attribute to 'row' and adding other classes as well
container.appendChild(row);                                              //  appending the row to the container


    function restcountries() {                                           // function is created for restcountries
             
        // Return a promise from the function
        return fetch('https://restcountries.com/v3.1/all')              //  calling the api and getting all countries data
          .then(response => response.json())                            //  convert the response data into json
         .catch(error => {                                              //   Catch any errors that might occur in the async functions below and display them on the console
            console.log('Error fetching countries details', error);
            // You may want to throw the error or handle it as needed
            throw error;
          });
      }  
      restcountries()                                                    // call the function name to execute
     .then(countries=>{                                                  // working on return promise data
        countries.forEach(country=>                                      // Applying iteration to get the value
        {

            let col_div = document.createElement('div');                 // create column divs
            col_div.setAttribute('class','col mb-4');                    // setting the class attribute to 'col'
            row.appendChild(col_div);                                    //  append child in row
            
            let card = document.createElement('div');                    //  create card and set class attribute
            card.setAttribute('class', 'card h-100');                    //  set attribute class and height  of the cards
            card.setAttribute('id','arrayOfCard');                       //  setting  id attribute of card
            col_div.appendChild(card);                                   //  appending card into column div
            
           
            let header = document.createElement('div');                                              //  create a div  element for header
            header.setAttribute('class','card-header header p-3 bg-black text-white');               //  setting  class and value for the attributes
            header.innerText = `${country.name.common}`                                              //  applying fetch value to the header
            card.appendChild(header);                                                                // appending to the card header
 
            let body = document.createElement('div');                                                 //  create a div element to the body
            body.setAttribute('class', 'card-body body p-3 bg-secondary-subtle bg-gradient');         //  adding class and attributes to card body
            card.appendChild(body);                                                                   //  adding body to the card
 
            let flag= document.createElement('img');                                                  //  creating img element and set its property
            flag.setAttribute('class','card-img-middle flag h-auto p-3');                             //  class for image and its properties
            flag.setAttribute('alt',`${country.flags.alt}`);                                          //  set Attribute alt for img tag
            flag.setAttribute('src',`${country.flags.png}`);                                          //  set Attribute src for img tag                
            flag.setAttribute('width','80%');                                                         //  setting width to the  image
            body.appendChild(flag);                                                                   //  Appending to the body
           

            let listitems = document.createElement('ul');                                              // create a unorder list items
            listitems.setAttribute("class", "list-group p-1 ");                                        // set Attribute of unorder list items
            listitems.style.listStyleType ='none';                                                     // setting style type = none. 
            body.appendChild(listitems);                                                               // appending list items to the body

            let Capital = document.createElement('li');                                                 // create a list items to display the content
            Capital.textContent =`Capital:${country.capital}`                                          
            
            let Region = document.createElement('li');                                                  // create a list items to display the content
            Region.textContent=`Region:${country.region}`
            
            let Countrycode = document.createElement('li');                                             // create a list items to display the content
            Countrycode.textContent=`Country Code:${country.cca3}`
            
            let latlng = document.createElement('li');                                                   // create a list items to display the content
            latlng.textContent=`Lat/Lng:${country.latlng}`
            listitems.append(Capital,Region,Countrycode,latlng);                                         // appending all the list items to the unorder list


            let button = document.createElement('button');                                                // create a button to display the weather
            button.setAttribute('class','btn btn-primary');                                               // set attribute to the button  
            button.innerText ="Click for Weather";                                                        // Text content to display in the button
            body.appendChild(button);                                                                     //  appending the button to the body

            let weatherDataDisplayed = false;                                                             // create a condition to display the weather of the country should display only one time.
            button.addEventListener("click",()=>{                                                         // if a button is click if the weather data is not displayed means it will execute the function.
            if(!weatherDataDisplayed){
                dataDisplayed();                                                                          // calling the function to execute the code.
                weatherDataDisplayed = true;
            }else{
                alert('Data is already displayed!');
            }
        })

            function dataDisplayed(){                                                                                                               // call the function to execute the set of code                                                                  
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+country.name.common+'&appid=c37f8ce1019d315e7d2f863488a584e3&units=metric')  // fetch bthe data to display the content
            .then((response)=>response.json())
            .catch((error)=>console.log(error))
            .then((data)=>{
               
             let weatherdata = document.createElement('div');                                                                                        // create a div element to display the weather in the card
             body.appendChild(weatherdata);                                                                                                          // Appending to the card body 

            let card = document.getElementById("arrayOfCard");                                                                                       // gettig the card with the help of id.  
            
            
            let unorderlist = document.createElement('ul');                                                                                           // create a unorder list items to display the content
            unorderlist.style.listStyleType= "none";                                                                                                  // set the attribute type to null                                                    
            weatherdata.appendChild(unorderlist);                                                                                                     // appending the data to the div
            unorderlist.innerHTML=`<li>Country Name: ${data.name}</li>                                                                                
                                       <li>Temp:${data.main.temp}<sup>°</sup>C</li> 
                                       <li>Min Temp : ${data.main.temp_min}<sup>°</sup>C</li>
                                       <li>Max Temp : ${data.main.temp_max}<sup>°</sup>C</li>
                                       <li>Humidity : ${data.main.humidity}%</li>`                                                                    // The list items are display in the card by using innerHTML
                                       card.style.display ="block";                                                                                   
                                       
            
            
            })
            .catch((error)=>console.log("Error in fetching the data",error));                                                                        // If incase of error it will display the error details in the console          
            }

        })
       })
            