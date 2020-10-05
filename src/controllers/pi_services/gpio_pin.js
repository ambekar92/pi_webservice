const con = require('../../config/db.js')

  const gpio_pin = (request, response) => {
     
     var gpio_pin = request.query.gpio_pin;
     var value = request.query.value;
     console.log(request.query);
     console.log('GPIO PIN');
     
     var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
     var LED = new Gpio(gpio_pin, 'out'); //use GPIO pin 4, and specify that it is output
     
      if(value==1){
       LED.writeSync(1); //set pin state to 1 (turn LED on)
       
        let res={
          "GPIO PIN":gpio_pin,
          "Value":value,
          "Status":'Running'
        };
        response.json(res);
        
      }
      
      if(value==0){
        LED.writeSync(0); //set pin state to 0 (turn LED off)
        LED.unexport(); // Unexport GPIO to free resources
      
        let res={
          "GPIO PIN":gpio_pin,
          "Value":value,
          "Status":'Stopped'
        };
        response.json(res);
      }

      response.end();
     
  }
  

  module.exports={
      gpio_pin,
  }
