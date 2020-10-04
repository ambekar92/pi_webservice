const con = require('../../config/db.js')

  const gpio_pin = (request, response) => {
     console.log('Running GPIO PIN');
     var gpio_pin = request.query.gpio_pin;
     var value = request.query.value;
     console.log(request.query);

      var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
      var LED = new Gpio(gpio_pin, 'out'); //use GPIO pin 4, and specify that it is output
     
      if(value==1){
        LED.writeSync(1); //set pin state to 1 (turn LED on)
      }
      
      if(value==0){
        LED.writeSync(0); //set pin state to 0 (turn LED off)
        LED.unexport(); // Unexport GPIO to free resources
      }
     
  }
  

  module.exports={
      gpio_pin,
  }
