//--------------------------------------------------------------------------------------------------
// Base Model Class: ClonableModel
//--------------------------------------------------------------------------------------------------
export class ClonableModel
{
    //----------------------------------------------------------------------------------------------
    // Protected Methods Section:
    //----------------------------------------------------------------------------------------------
    protected loadPropertiesFromObject(objectArgument: {})
    {
        for (var attr in objectArgument)
        {
            if (objectArgument.hasOwnProperty(attr))
            {
                this[attr] = objectArgument[attr];
            }
        }
    }

    //----------------------------------------------------------------------------------------------
    protected loadPropertiesFromParams(params: any[], paramNames: string[])
    {
        for (var paramCounter = 0; paramCounter < params.length; paramCounter++)
        {
            this[this.getPropertyNameFromParamName(paramNames[paramCounter])] = params[paramCounter];
        }
    }

    //----------------------------------------------------------------------------------------------
    protected getParamNames(func)
    {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;

        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    //----------------------------------------------------------------------------------------------
    protected getClone()
    {
        // Shallow Clone!
        let literalObject: {} = Object.assign({}, this);
        let protoObject = Object.create(this);
        protoObject.loadPropertiesFromObject(literalObject);

        return protoObject;
    }

    //----------------------------------------------------------------------------------------------
    protected getDeepClone()
    {
        return this.deepCopy(this);
    }

    //----------------------------------------------------------------------------------------------
    // Private Methods Section
    //----------------------------------------------------------------------------------------------
    private getPropertyNameFromParamName(paramName: string): string
    {
        let retVal: string = paramName.substring(1);
        let firstLetter: string = retVal.substring(0,1).toLowerCase();
        retVal = firstLetter + retVal.substring(1);

        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    private deepCopy(obj)
    {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj)
        {
            return obj;
        }


        // Handle Date
        if (obj instanceof Date)
        {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array)
        {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object)
        {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}
