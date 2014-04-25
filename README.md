retryConfigOptions
==================

This is a configuration utility for the nodejs npm retry module.  

The user identifies the maximum elapsed time that should be allowed for retries and the utility identifies a list of configurations that satisfy that requirement.

retryConfigOptionsTest.js should be edited to set the arguments for retryConfig.saveToFile(7,0,0).  The arguments are (hours, minutes, seconds).  Save the edited file.

Run "runRetryConfigOptionsTest.bat".

A time stamped report will be generated in the current directory.

An example of the report follows:
{

"maxElapsedTime":"7 hours 0 minutes 0 seconds",

"maxElapsedTimeMS":25200000,

"instructions":
"To achieve a maximum elapsed retry time of 7 hours 0 minutes 0 seconds use one of the objects in options.  
Please note, the options array first lists the configuration objects where minTimeout is adjusted to achieve the 
desired maximum elapsed retry time.  For this group of configuration objects factor is set to 2 which is the default. 
The 2nd half of the options array lists the configuration objects where factor is adjusted to achieve the desired 
maximum elapsed retry time. For this group of configuration objects minTimeout is set to 1000 which is the default.  
The options array is generated based on values of retries in the range of 3 to 40.  If a retries value does not hit 
the desired maximum elapsed retry time exactly it is eliminated from the options array.",

"options":

[
  {
    "retries":9,
    "factor":2,
    "minTimeout":49315,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":10,
    "factor":2,
    "minTimeout":24633,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":11,
    "factor":2,
    "minTimeout":12311,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":12,
    "factor":2,
    "minTimeout":6154,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":13,
    "factor":2,
    "minTimeout":3077,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":14,
    "factor":2,
    "minTimeout":1538,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":15,
    "factor":2,
    "minTimeout":769,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":16,
    "factor":2,
    "minTimeout":385,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":17,
    "factor":2,
    "minTimeout":192,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":18,
    "factor":2,
    "minTimeout":96,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":19,
    "factor":2,
    "minTimeout":48,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":20,
    "factor":2,
    "minTimeout":24,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":21,
    "factor":2,
    "minTimeout":12,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":22,
    "factor":2,
    "minTimeout":6,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":23,
    "factor":2,
    "minTimeout":3,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":24,
    "factor":2,
    "minTimeout":2,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":6,
    "factor":7.3726,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":7,
    "factor":5.2263,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":8,
    "factor":4.0866,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":9,
    "factor":3.3983,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":10,
    "factor":2.9446,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":11,
    "factor":2.6262,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":12,
    "factor":2.392,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":13,
    "factor":2.2132,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":14,
    "factor":2.0729,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":15,
    "factor":1.9599,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":16,
    "factor":1.8674,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":17,
    "factor":1.7902,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":18,
    "factor":1.7249,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":19,
    "factor":1.669,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":20,
    "factor":1.6208,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":21,
    "factor":1.5786,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":22,
    "factor":1.5416,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":23,
    "factor":1.5087,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":24,
    "factor":1.4794,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":25,
    "factor":1.4531,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":26,
    "factor":1.4294,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":27,
    "factor":1.408,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":28,
    "factor":1.3884,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":29,
    "factor":1.3706,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":30,
    "factor":1.3542,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":31,
    "factor":1.3392,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":32,
    "factor":1.3253,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":33,
    "factor":1.3124,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":34,
    "factor":1.3005,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":35,
    "factor":1.2893,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":36,
    "factor":1.279,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":37,
    "factor":1.2693,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":38,
    "factor":1.2602,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":39,
    "factor":1.2517,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  },

  {
    "retries":40,
    "factor":1.2437,
    "minTimeout":1000,
    "maxTimeout":Infinity,
    "randomize":false
  }

]

}


