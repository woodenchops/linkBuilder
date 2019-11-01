function DeepLinkBuilder(){

    var protocolInput = document.getElementById('protocol'),
        environmentInput = document.getElementById('environment'),
        localeInput = document.getElementById('locale'),
        brandInput = document.getElementById('brand'),
        searchBookInput = document.getElementById('searchBook'),
        ctyhocnInput = document.getElementById('ctyhocn'),
        ctyhocnCheckBox = document.getElementById('ctyhocn-checkbox'),
        result = document.getElementById('result'),
        copyButton = document.getElementById('copyText'),
        self = this;

    // check if field is empty 

    this.checkIfEmpty = function(field) {
        if(field === undefined || field === null ) {
            return "";
        } else {
            return field;
        }
    }

    // add button to allow user to copy link

    this.copyLink = function() {
        result.select();
        document.execCommand("copy");
        result.setSelectionRange(0, 99999); /*For mobile devices*/
    }

    copyButton.addEventListener('click', this.copyLink);


    // protocol section

    this.setProtocol = function(val) {
        this._protocolValue = val;
        this.generateURL();
    }

    this.getProtocol = function() {
        return this.checkIfEmpty(this._protocolValue);
    }

    // env section

    this.setEnv = function(val) {
        this._env = val;
        this.generateURL();
    }

    this.getEnv = function() {
       return this.checkIfEmpty(this._env);
    }


    // locale section

    this.setLocale = function(val) {
        this._locale = val;
        this.generateURL();
    }

    this.getLocale = function() {
        return this.checkIfEmpty(this._locale);
    }


    // brand section

    this.setBrand = function(val) {
        this._brandValue = val;
        this.generateURL();
    }

    this.getBrand = function() {
        return this.checkIfEmpty(this._brandValue);
    }


    // Search/Book section

    this.setSearchBook = function(val) {
        this._searchBook = val;
        this.generateURL();
    }

    this.getSearchBook = function() {
        return this.checkIfEmpty(this._searchBook);
    }

    // ctyhocn section

    this.setCtyhocn = function(val) {

        if(val.length <= 0) {
            ctyhocnCheckBox.checked = false;
            this._ctyhocn = "";
            this.generateURL();
        } else {
            var param = ctyhocnInput.getAttribute('data-param');
            this._ctyhocn = param + '=' + val;
            this.generateURL();
        }
    }

    this.getCtyhocn = function() {
        return this.checkIfEmpty(this._ctyhocn);
    }

    // create the URL

    this.generateURL = function() {
        return result.value = this.getURL()
    }
    // get the URL

    this.getURL = function() {
        return this.getProtocol() + 
               this.getEnv() + 
               this.getLocale() +  
               this.getBrand() + 
               this.getSearchBook() +
               this.getCtyhocn();
    }

    // all the event listeners for each input field

    protocolInput.addEventListener('input', function(e) {
        this.setProtocol(e.target.value);
    }.bind(self));

    environmentInput.addEventListener('input', function(e) {
        this.setEnv(e.target.value);
    }.bind(self));

    localeInput.addEventListener('input', function(e) {
        this.setLocale(e.target.value);
    }.bind(self));

    brandInput.addEventListener('input', function(e) {
        this.setBrand(e.target.value);
    }.bind(self));

    searchBookInput.addEventListener('input', function(e) {
        this.setSearchBook(e.target.value);
    }.bind(self));


    ctyhocnInput.addEventListener('input', function(e) {
        this.setCtyhocn(e.target.value);
    }.bind(self));

    

}

var deeplink = new DeepLinkBuilder();
