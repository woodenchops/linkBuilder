/*
DeepLinkModel => builds the link - getters and setters
DeeplinkUI => builds the link via a form 
*/


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


var View = function DeeplinkUI() {

    var parentContainer = document.getElementById('paramContainer');

    this.init = function() {
        
        // add param input fields

        this.ctyhocn = new AddParamInput('ctyhocn', parentContainer, 'Ctyhocn', this);
        this.spec_plan = new AddParamInput('spec_plan', parentContainer, 'Spec_Plan', this);
        this.offerId = new AddParamInput('offerid', parentContainer, 'Offer ID', this);
        this.hotel = new AddParamInput('hotel', parentContainer, 'Hotel', this);
        this.tid = new AddParamInput('tid', parentContainer, 'TID', this);
        this.spec_plan_desc = new AddParamInput('spec-plan-desc', parentContainer, 'Spec_Plan_Desc', this);
        this.enhance_code = new AddParamInput('enhance_code', parentContainer, 'Enhance Code', this);
        this.enhance_code_desc = new AddParamInput('enhance_code_desc', parentContainer, 'Enhance Code Desc', this);
    }

    // init section 

    this.init();
        
    var environmentInput = document.getElementById('environment'),
    localeInput = document.getElementById('locale'),
    brandInput = document.getElementById('brand'),
    searchBookInput = document.getElementById('searchBook'),
    result = document.getElementById('result'),
    copyButton = document.getElementById('copyText'),
    self = this;

    this.deeplinkModel = new DeepLinkModel();

    this.copyLinkNotification = new CopyLinkNotification();

    this.fieldHasValue = function(input, checkbox, param) {
        if(input.value.length <= 0) {
            checkbox.checked = false;
            this.deeplinkModel.removeParam(param);
            this.generateURL();
        }
    }

        // add button to allow user to copy link

    this.copyLink = function() {
        result.select();
        document.execCommand("copy");
        result.setSelectionRange(0, 99999); /*For mobile devices*/
        this.copyLinkNotification.display();
    }.bind(self);

    copyButton.addEventListener('click', this.copyLink);

    this.generateURL = function () {
        result.value = this.deeplinkModel.getURL();
    }

    // all the event listeners for each input field

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

}

// create copy notification
function CopyLinkNotification() {

    var copyNotification = document.getElementById('copy-notification');

    this.display = function() {

        copyNotification.classList.add('show');
        setTimeout(function() {
            copyNotification.setAttribute('tabindex', '0');
            copyNotification.focus();
        });
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 1000);

        setTimeout(function() {
            copyNotification.removeAttribute('tabindex');
        }, 2000)
    }
}

// create input for param

function AddParamInput(param, parent, label,view) {
    this._param = param;
    this._parent = parent;
    this._label = label;
    this._checkBox = '<input type="checkbox" name="'+ this._param  +'" id="'+ this._param +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label;
    this._inputFieldValue = '<input type="text" id="'+ this._param +'-inputField" placeholder="'+ this._param +'" data-param="'+ this._param +'" class="deeplinkParamValue">';

    // create Fieldset Element

    this.fieldSet = document.createElement('FIELDSET');
    this.fieldSet.classList.add('field');
    this.fieldSet.innerHTML =  this._checkBox + this._inputFieldValue;

    parent.appendChild(this.fieldSet);

    var checkbox = document.getElementById(this._param + '-checkbox');
    var inputField = document.getElementById(this._param + '-inputField');
                              
    // add checkbox Event Listener

    checkbox.addEventListener('input', function(e) {
        if(!checkbox.checked) {
            inputField.value = '';
            view.deeplinkModel.removeParam(this._param);
            view.generateURL();
        }
    }.bind(this));


    // add input Event Listener

    inputField.addEventListener('input', function(e) {
        view.deeplinkModel.setParam(this._param,e.target.value);
        view.generateURL();
        view.fieldHasValue(inputField, checkbox, this._param);
    }.bind(this));
                        

}

var formUI = new View();
