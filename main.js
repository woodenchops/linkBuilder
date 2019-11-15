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
    dropdownParentContainer = document.getElementById('dropdownContainer')
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

    // environmentInput.addEventListener('input', function(e) {
    //     this.deeplinkModel.setEnv(e.target.value);
    //     this.generateURL();
    // }.bind(self));

    // localeInput.addEventListener('input', function(e) {
    //     this.deeplinkModel.setLocale(e.target.value);
    //     this.generateURL();
    // }.bind(self));

    // brandInput.addEventListener('input', function(e) {
    //     this.deeplinkModel.setBrand(e.target.value);
    //     this.generateURL();
    // }.bind(self));

    // searchBookInput.addEventListener('input', function(e) {
    //     this.deeplinkModel.setSearchBook(e.target.value);
    //     this.generateURL();
    // }.bind(self));

    // params

    this.init = function() {

        // add dropdowns

        this.envDrop = new AddDropDown(
            dropdownParentContainer, 
            'select an environment', 
            {
                'hjhjh': 'Hilton', 
                'jhvjhv': 'Bob',
            });

        this.localeDrop = new AddDropDown(
            dropdownParentContainer, 
            'select a locale', 
            {
                'hjhjh': 'Hilton', 
                'jhvjhv': 'Bob',
            });

        this.brandDrop = new AddDropDown(
            dropdownParentContainer, 
            'select a locale', 
            {
                'hjhjh': 'Hilton', 
                'jhvjhv': 'Bob',
            });
    
        // add param input fields

        this.ctyhocn = new AddParamInput('ctyhocn', paramparentContainer, 'Ctyhocn', this, 'text');
        this.spec_plan = new AddParamInput('spec_plan', paramparentContainer, 'Spec_Plan', this, 'text');
        this.offerId = new AddParamInput('offerid', paramparentContainer, 'Offer ID', this, 'text');
        this.hotel = new AddParamInput('hotel', paramparentContainer, 'Hotel', this, 'text');
        this.tid = new AddParamInput('tid', paramparentContainer, 'TID', this, 'text');
        this.spec_plan_desc = new AddParamInput('spec-plan-desc', paramparentContainer, 'Spec_Plan_Desc', this, 'text');
        this.enhance_code = new AddParamInput('enhance_code', paramparentContainer, 'Enhance Code', this, 'text');
        this.enhance_code_desc = new AddParamInput('enhance_code_desc', paramparentContainer, 'Enhance Code Desc', this, 'text');
        this.rooms = new AddParamInput('rooms', paramparentContainer, 'Rooms', this, 'number');
        this.adults = new AddParamInput('adults', paramparentContainer, 'Adults', this, 'number');
        this.children = new AddParamInput('children', paramparentContainer, 'Children', this, 'number');
        this.pnd = new AddParamInput('pnd', paramparentContainer, 'PND', this, 'text');
        this.arrival = new AddParamInput('arrival', paramparentContainer, 'Arrival', this, 'date');
        this.departure = new AddParamInput('departure', paramparentContainer, 'Departure', this, 'date');
    }

    // init section 

    this.init();

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

function AddParamInput(param, parent, label,view, type) {
    this._param = param;
    this._parent = parent;
    this._label = label;
    this._checkBox = '<input type="checkbox" name="'+ this._param  +'" id="'+ this._param +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label;
    this._inputFieldValue = '<input type="'+ type +'" id="'+ this._param +'-inputField" placeholder="'+ this._param +'" data-param="'+ this._param +'" class="deeplinkParamValue">';

    // create Fieldset Element

    this.fieldSet = document.createElement('FIELDSET');
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

function AddDropDown(parent, label, props) {

    var select = document.createElement('SELECT');
    select.innerHTML = '<option disabled selected value> -- '+ label +' -- </option>';

        if(Object.entries(props).length > 0){

            Object.entries(props).forEach( function(val) {
                select.innerHTML += '<option value="'+ val[0] +'">'+ val[1]; +'</option>';
            });
        }

        parent.appendChild(select);
}

var formUI = new View();
