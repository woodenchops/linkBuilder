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
        
    var environmentInput = document.getElementById('environment'),
    localeInput = document.getElementById('locale'),
    brandInput = document.getElementById('brand'),
    searchBookInput = document.getElementById('searchBook'),
    result = document.getElementById('result'),
    copyButton = document.getElementById('copyText'),
    paramparentContainer = document.getElementById('paramContainer'),
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

    // params

    this.init = function() {

        this.ctyhocn = new AddParamInput({param:'ctyhocn', parent: paramparentContainer, label: 'Ctyhocn', view: this, type: 'text'});
        this.spec_plan = new AddParamInput({param: 'spec_plan', parent: paramparentContainer, label: 'Spec_Plan', view: this, type: 'text'});
        this.offerId = new AddParamInput({param: 'offerid', parent: paramparentContainer, label: 'Offer ID', view: this, type: 'text'});
        this.hotel = new AddParamInput({param: 'hotel', parent: paramparentContainer, label: 'Hotel', view: this, type: 'text'});
        this.tid = new AddParamInput({param: 'tid', parent: paramparentContainer, label: 'TID', view: this, type: 'text'});
        this.spec_plan_desc = new AddParamInput({param: 'spec-plan-desc', parent: paramparentContainer, label: 'Spec_Plan_Desc', view: this, type: 'text'});
        this.enhance_code = new AddParamInput({param: 'enhance_code', parent: paramparentContainer, label: 'Enhance Code', view: this, type: 'text'});
        this.enhance_code_desc = new AddParamInput({param: 'enhance_code_desc', parent: paramparentContainer, label: 'Enhance Code Desc', view: this, type: 'text'});
        this.rooms = new AddParamInput({param: 'rooms', parent: paramparentContainer, label: 'Rooms', view: this, type: 'number'});
        this.adults = new AddParamInput({param: 'adults', parent: paramparentContainer, label: 'Adults', view: this, type: 'number'});
        this.children = new AddParamInput({param: 'children', parent: paramparentContainer, label: 'Children', view: this, type: 'number'});
        this.pnd = new AddParamInput({param: 'pnd', parent: paramparentContainer, label: 'PND', view: this, type: 'text'});
        this.arrival = new AddParamInput({param: 'arrival', parent: paramparentContainer, label: 'Arrival', view: this, type: 'date'});
        this.departure = new AddParamInput({param: 'departure', parent: paramparentContainer, label: 'Departure', view: this, type: 'date'});
        this.departure = new AddParamInput({param: 'departure', parent: paramparentContainer, label: 'Departure', view: this, type: 'date'});
        this.flexi = new AddParamInput({param: 'flexi', parent: paramparentContainer, label: 'Flexi', view: this, type: 'text'});
        this.mcid = new AddParamInput({param: 'mcid', parent: paramparentContainer, label: 'MCID', view: this, type: 'text'});
    }

    // init section 

    this.init();

}

// create input for param

function AddParamInput(props) {
    this._param = props.param;
    this._parent = props.parent;
    this._label = props.label;
    this._checkBox = '<input type="checkbox" name="'+ this._param  +'" id="'+ this._param +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label;
    this._inputFieldValue = '<input type="'+ props.type +'" id="'+ this._param +'-inputField" placeholder="'+ this._param +'" data-param="'+ this._param +'" class="deeplinkParamValue">';

    // create Fieldset Element

    this.fieldSet = document.createElement('FIELDSET');
    this.fieldSet.innerHTML =  this._checkBox + this._inputFieldValue;

    props.parent.appendChild(this.fieldSet);

    var checkbox = document.getElementById(this._param + '-checkbox');
    var inputField = document.getElementById(this._param + '-inputField');
                              
    // add checkbox Event Listener

    checkbox.addEventListener('input', function(e) {
        if(!checkbox.checked) {
            inputField.value = '';
            props.view.deeplinkModel.removeParam(this._param);
            props.view.generateURL();
        }
    }.bind(this));


    // add input Event Listener

    inputField.addEventListener('input', function(e) {
        props.view.deeplinkModel.setParam(this._param,e.target.value);
        props.view.generateURL();
        props.view.fieldHasValue(inputField, checkbox, this._param);
    }.bind(this));
                        

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

var formUI = new View();
