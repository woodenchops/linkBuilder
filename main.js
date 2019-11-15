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


function DeeplinkUI() {

    var parentContainer = document.getElementById('paramContainer');

    this.init = function() {
        console.log('up and running!!');
        
        this.ctyhocn = new AddParamInput('ctyhocn', parentContainer, 'Ctyhocn');
        this.spec_plan = new AddParamInput('spec_plan', parentContainer, 'Spec_Plan');
        this.offerId = new AddParamInput('offerid', parentContainer, 'Offer ID');
        this.hotel = new AddParamInput('hotel', parentContainer, 'Hotel');
        this.tid = new AddParamInput('tid', parentContainer, 'TID');
        this.spec_plan_desc = new AddParamInput('spec-plan-desc', parentContainer, 'Spec_Plan_Desc');
    }

    // init section 

    this.init();


    var environmentInput = document.getElementById('environment'),
    localeInput = document.getElementById('locale'),
    brandInput = document.getElementById('brand'),
    searchBookInput = document.getElementById('searchBook'),
    ctyhocnInput = document.getElementById('ctyhocn'),
    ctyhocnCheckBox = document.getElementById('ctyhocn-checkbox'),
    specPlanInput = document.getElementById('spec_plan'),
    specPlanCheckBox = document.getElementById('spec_plan-checkbox'),
    offerIdInput = document.getElementById('offerid'),
    offerIdCheckBox = document.getElementById('offerid-checkbox'),
    hotelInput = document.getElementById('hotel'),
    hotelCheckBox = document.getElementById('hotel-checkbox'),
    tidInput = document.getElementById('tid'),
    tidCheckBox = document.getElementById('tid-checkbox'),
    specPlanDescInput = document.getElementById('spec-plan-desc'),
    specPlanDescCheckBox = document.getElementById('spec-plan-desc-checkbox'),
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

    // // set params ----------------------------------------

    // // ctyhocn

    ctyhocnCheckBox.addEventListener('input', function(e) {
        if(!ctyhocnCheckBox.checked) {
            ctyhocnInput.value = '';
            this.deeplinkModel.removeParam('ctyhocn');
            this.generateURL();
        }
    }.bind(self));
    
    ctyhocnInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('ctyhocn',e.target.value);
        this.generateURL();
        this.fieldHasValue(ctyhocnInput, ctyhocnCheckBox, 'ctyhocn');
    }.bind(self));

    // // spec plan

    specPlanCheckBox.addEventListener('input', function(e) {
        if(!specPlanCheckBox.checked) {
            specPlanInput.value = '';
            this.deeplinkModel.removeParam('spec_plan');
            this.generateURL();
        }
    }.bind(self));

    specPlanInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('spec_plan',e.target.value);
        this.generateURL();
        this.fieldHasValue(specPlanInput, specPlanCheckBox, 'spec_plan');
    }.bind(self));

    // // offer ID

    offerIdCheckBox.addEventListener('input', function(e) {
        if(!offerIdCheckBox.checked) {
            offerIdInput.value = '';
            this.deeplinkModel.removeParam('offerId');
            this.generateURL();
        }
    }.bind(self));

    offerIdInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('offerId',e.target.value);
        this.generateURL();
        this.fieldHasValue(offerIdInput, offerIdCheckBox, 'offerId');
    }.bind(self));

    // // Hotel

    hotelCheckBox.addEventListener('input', function(e) {
        if(!hotelCheckBox.checked) {
            hotelInput.value = '';
            this.deeplinkModel.removeParam('hotel');
            this.generateURL();
        }
    }.bind(self));

    hotelInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('hotel',e.target.value);
        this.generateURL();
        this.fieldHasValue(hotelInput, hotelCheckBox, 'hotel');
    }.bind(self));

    // //  TID

    tidCheckBox.addEventListener('input', function(e) {
        if(!tidCheckBox.checked) {
            tidInput.value = '';
            this.deeplinkModel.removeParam('tid');
            this.generateURL();
        }
    }.bind(self));


    tidInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('tid',e.target.value);
        this.generateURL();
        this.fieldHasValue(tidInput, tidCheckBox, 'tid');
    }.bind(self));

    // // spec plan desc

    specPlanDescCheckBox.addEventListener('input', function(e) {
        if(!specPlanDescCheckBox.checked) {
            tidInput.value = '';
            this.deeplinkModel.removeParam('spec_plan_desc');
            this.generateURL();
        }
    }.bind(self));

    specPlanDescInput.addEventListener('input', function(e) {
        this.deeplinkModel.setParam('spec_plan_desc',e.target.value);
        this.generateURL();
        this.fieldHasValue(specPlanDescInput, specPlanDescCheckBox, 'spec_plan_desc');
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

function AddParamInput(param, parent, label) {
    this._param = param;
    this._parent = parent;
    this._label = label; 

    var fieldSet = document.createElement('FIELDSET');
    fieldSet.innerHTML = '<input type="checkbox" name="'+ this._param  +'" id="'+ this._param  +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label +
                         '<input type="text" id="'+ this._param +'" placeholder="'+ this._param +'" data-param="'+ this._param +'" class="deeplinkParamValue">';
                        
    parent.appendChild(fieldSet);

}

var formUI = new DeeplinkUI();
