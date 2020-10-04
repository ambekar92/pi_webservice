const con = require('../../config/db.js')

const getUsers = (request, response) => {
 var key={};
  con.query('SELECT * FROM access_token', (error, results) => {
      if (error) {
        throw error
      }
      key['data']=(results);
      response.json(key)
      // for(i=0;i<results.rows.length;i++){
      //     o.push(results.rows[i])
      // }
      // key['data']=sto;
      // response.json(key);
    })
  }

  
  const getuser = (request, response) => {
    const {name,address,created_at} = request.body;
    con.query('INSERT INTO public.tb_info_name (name,address,created_at) values ($1,$2,NOW())',[name,address], (error, results) => {
 
      if (error) {
        throw error
      }
      response.json(results)
      response.end(`User added with ID: ${results}`);
      // for(i=0;i<results.rows.length;i++){
      //     o[key].push(results.rows[i])
      // }
      // response.json(o)
     
    });
  }

  const testAPI = (request, response) => {
     console.log('TEST');
     var id = request.query.id;
     console.log(request.query);

      var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
      var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
      var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

      function blinkLED() { //function to start blinking
        if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
          LED.writeSync(1); //set pin state to 1 (turn LED on)
        } else {
          LED.writeSync(0); //set pin state to 0 (turn LED off)
        }
      }

      function endBlink() { //function to stop blinking
        clearInterval(blinkInterval); // Stop blink intervals
        LED.writeSync(0); // Turn LED off
        LED.unexport(); // Unexport GPIO to free resources
      }

      setTimeout(endBlink, 5000); //stop blinking after 5 seconds

  }
  

  module.exports={
      getUsers,
      getuser,
      testAPI
  }