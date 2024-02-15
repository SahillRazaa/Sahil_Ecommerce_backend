Some important points regarding models in mongoDB.

1. Models is a way using which we can send or recive data from our backEnd(MongoDb).
2. Here on each we can give some properties:
    a. Type of data
    b. If it is required to fill or not by user or admin while communicating between 
        the dataBase.
    c. Also we can tell if it should be unique or not(to avoid duplication)
    d. We can even set some default values as an initialization.

3. To add timeStamps of when created,updated,deleted,etc. We use the command
    {timestamps : true} outiside of the object.
    
4. Schema means we are creating a data collection in out database.