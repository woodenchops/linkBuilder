function DeepLinkModel(){

    // params obj

    this._params = {};

    // check if field is empty 

    this.checkIfEmpty = function(field) {
       return (field) ? field : '';
    }

    // protocol section

    this.setProtocol = function(val) {
        this._protocolValue = val;
    }

    this.getProtocol = function() {
        return this.checkIfEmpty(this._protocolValue);
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

            Object.entries(this._params).forEach( (val,idx) => {
                queryString += (idx === 0)? '?' : '&'; // build the url by starting off by adding "?" at start then "&" inbetween params
                queryString += val[0] + '=' + val[1]; // params key/value pairs 
            });
        }

        return queryString;

    }

    // get the URL

    this.getURL = function() {
        return this.getProtocol() + 
               this.getEnv() + 
               this.getLocale() +  
               this.getBrand() + 
               this.getSearchBook() +
               this.buildParamString();
    }

}

function DeeplinkUI() {

    var protocolInput = document.getElementById('protocol'),
    environmentInput = document.getElementById('environment'),
    localeInput = document.getElementById('locale'),
    brandInput = document.getElementById('brand'),
    searchBookInput = document.getElementById('searchBook'),
    ctyhocnInput = document.getElementById('ctyhocn'),
    ctyhocnCheckBox = document.getElementById('ctyhocn-checkbox'),
    specPlanInput = document.getElementById('spec_plan'),
    specPlanCheckBox = document.getElementById('spec_plan-checkbox'),
    result = document.getElementById('result'),
    copyButton = document.getElementById('copyText'),
    self = this;

    this.deeplinkModel = new DeepLinkModel();

    // add button to allow user to copy link

    this.copyLink = function() {
        result.select();
        document.execCommand("copy");
        result.setSelectionRange(0, 99999); /*For mobile devices*/
    }

    copyButton.addEventListener('click', this.copyLink);

    this.generateURL = function () {
        result.value = this.deeplinkModel.getURL();
    }

    // all the event listeners for each input field

    protocolInput.addEventListener('input', function(e) {
        this.deeplinkModel.setProtocol(e.target.value);
        this.generateURL();
    }.bind(self));

    environmentInput.addEventListener('input', function(e) {
        this.deeplinkModel.setEnv(e.target.value);
        this.generateURL();
    }.bind(self));

    localeInput.addEventListener('input', function(e) {
        this.deeplinkModel.setLocale(e.target.value);
        this.generateURL();
    }.bind(self));

    brandInput.addEventListener('input', function(e) {
        this.deeplinkModel.setBrand(e.target.value);
        this.generateURL();
    }.bind(self));

    searchBookInput.addEventListener('input', function(e) {
        this.deeplinkModel.setSearchBook(e.target.value);
        this.generateURL();
    }.bind(self));

    // ctyhocn

    ctyhocnCheckBox.addEventListener('input', function(e) {
        if(!ctyhocnCheckBox.checked) {
            ctyhocnInput.value = '';
            this.deeplinkModel.removeParam('ctyhocn');
            this.generateURL();
        }
    }.bind(self));
    
    ctyhocnInput.addEventListener('input', function(e) {
        var param = ctyhocnInput.getAttribute('data-param');
        this.deeplinkModel.setParam(param,e.target.value);
        this.generateURL();
    }.bind(self));

    // spec plan

    specPlanCheckBox.addEventListener('input', function(e) {
        if(!specPlanCheckBox.checked) {
            specPlanInput.value = '';
            this.deeplinkModel.removeParam('spec_plan');
            this.generateURL();
        }
    }.bind(self));

    specPlanInput.addEventListener('input', function(e) {
        var param = specPlanInput.getAttribute('data-param');
        this.deeplinkModel.setParam(param,e.target.value);
        this.generateURL();
    }.bind(self));

}

var formUI = new DeeplinkUI();
