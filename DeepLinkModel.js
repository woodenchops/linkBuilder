
function DeepLinkModel(){

    // params obj

    this._params = {};

    // check if field is empty 

    this.checkIfEmpty = function(field) {
       return (field) ? field : '';
    }

    // env section

    this.setEnv = function(val) {
        this._env = val;
    }

    this.getEnv = function() {
       return this.checkIfEmpty(this._env);
    }

    // locale section

    this.setLocale = function(val) {
        this._locale = val;
    }

    this.getLocale = function() {
        return this.checkIfEmpty(this._locale);
    }

    // brand section

    this.setBrand = function(val) {
        this._brandValue = val;
    }

    this.getBrand = function() {
        return this.checkIfEmpty(this._brandValue);
    }

    // Search/Book section

    this.setSearchBook = function(val) {
        this._searchBook = val;
    }

    this.getSearchBook = function() {
        return this.checkIfEmpty(this._searchBook);
    }

    // params --------------------------------------

    this.setParam = function(param,val){
        this._params[param] = val;
    }

    this.getParam = function(param){
        return this._params[param];
    }

    this.removeParam = function(param){
        delete this._params[param];
    }

    this.buildParamString = function(){

        var queryString = "";

        if(Object.entries(this._params).length > 0){

            Object.entries(this._params).forEach( function(val,idx) {
                queryString += (idx === 0)? '?' : '&'; // build the url by starting off by adding "?" at start then "&" inbetween params
                queryString += val[0] + '=' + val[1]; // params key/value pairs 
            });
        }

        return queryString;

    }

    // get the URL

    this.getURL = function() {
        return 'https://' + 
               this.getEnv() + 
               this.getLocale() +  
               this.getBrand() + 
               this.getSearchBook() +
               this.buildParamString();
    }

    this.getParams = function() {
        return this._params;
    }

}

export default DeepLinkModel;