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

    this.formatQueryString = function(qs) {
       return qs.split('-').join('').split(' ').join('_');
    }

    this.buildParamString = function(){

        var queryString = "";

        if(Object.entries(this._params).length > 0){

            Object.entries(this._params).forEach( function(val,idx) {
                queryString += (idx === 0)? '?' : '&'; // build the url by starting off by adding "?" at start then "&" inbetween params
                queryString += val[0] + '=' + val[1]; // params key/value pairs 
            });
        }

        return this.formatQueryString(queryString);

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

// DEEPLINK UI

var View = function DeeplinkUI(props) {
        
    var environmentInput = document.getElementById(props.env),
    localeInput = document.getElementById(props.locale),
    brandInput = document.getElementById(props.brand),
    searchBookInput = document.getElementById(props.searchBook),
    result = document.getElementById(props.result),
    copyButton = document.getElementById(props.copyBtn),
    paramparentContainer = document.getElementById(props.parent),
    copyNotification = props.copyNotification,
    ohwCTA = document.getElementById(props.ohwCTA),
    standardDeepLinkCTA = document.getElementById(props.standardLinkCTA),
    testLinkCTA = document.getElementById(props.testLinkCTA),
    clearInput = document.getElementById(props.clearInput),
    self = this;


    this.deeplinkModel = new DeepLinkModel();

    this.copyLinkNotification = new CopyLinkNotification(copyNotification);

    var OHWPreset = {
        env: 'www.hilton.com/',
        locale: 'en_US/',
        book: 'book/reservation/deeplink'
    };

    var standardDeeplinkPreset = {
        env: 'www3.hilton.com/',
        locale: 'en_US/',
        brand: 'hi/',
        book: 'reservation/book.htm'
    };

    this.createOHWLink = function() {
        this.deeplinkModel.setEnv(OHWPreset.env);
        this.deeplinkModel.setLocale(OHWPreset.locale);
        this.deeplinkModel.setSearchBook(OHWPreset.book);
        brandInput.disabled = true;

        // set options
        environmentInput.value = OHWPreset.env;
        localeInput.value = OHWPreset.locale;
        searchBookInput.value = OHWPreset.book;
        
        // set active class on cta
        standardDeepLinkCTA.classList.remove('active');
        ohwCTA.classList.add('active');

        // generate URL
        this.generateURL();
    };

    this.createStandardDeeplink = function() {
        this.deeplinkModel.setEnv(standardDeeplinkPreset.env);
        this.deeplinkModel.setLocale(standardDeeplinkPreset.locale);
        this.deeplinkModel.setBrand(standardDeeplinkPreset.brand);
        this.deeplinkModel.setSearchBook(standardDeeplinkPreset.book);
        brandInput.disabled = false;

        // set options
        environmentInput.value = standardDeeplinkPreset.env;
        localeInput.value = standardDeeplinkPreset.locale;
        brandInput.value = standardDeeplinkPreset.brand;
        searchBookInput.value = standardDeeplinkPreset.book;

        // set active class on cta
        ohwCTA.classList.remove('active');
        standardDeepLinkCTA.classList.add('active');

        // generate URL
        this.generateURL();

    };

    this.reset = function() {

        this.deeplinkModel.setEnv('');
        this.deeplinkModel.setLocale('');
        this.deeplinkModel.setBrand('');
        this.deeplinkModel.setSearchBook('');

        environmentInput.value = '';
        localeInput.value = '';
        brandInput.value = '';
        searchBookInput.value = '';

        result.value = '';

    };


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
        if(result.value.length <= 0) {
            alert('No link to copy - please provide a link');
        } else {
            this.copyLinkNotification.display();
        }
    }.bind(self);

    copyButton.addEventListener('click', this.copyLink);


    this.generateURL = function () {
        result.value = this.deeplinkModel.getURL();
    }

    testLinkCTA.addEventListener('click', function() {
        if(result.value.length <= 0) {
            alert('No link to test - please provide a link');
        } else {
            window.open(result.value);
        }
    }.bind(self));

    clearInput.addEventListener('click', function() {
        this.reset();
    }.bind(self));

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

    ohwCTA.addEventListener('click', function(e) {
        this.createOHWLink();
    }.bind(self));

    standardDeepLinkCTA.addEventListener('click', function(e) {
        this.createStandardDeeplink();
    }.bind(self));

    // params

    this.init = function() {

        this.ctyhocn = new AddParamInput({param:'ctyhocn', parent: paramparentContainer, label: 'Ctyhocn', view: this, type: 'text', checked: 'checked'});
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
        this.flexi = new AddParamInput({param: 'flexi', parent: paramparentContainer, label: 'Flexi', view: this, type: 'text'});
        this.mcid = new AddParamInput({param: 'mcid', parent: paramparentContainer, label: 'MCID', view: this, type: 'text'});

        // set the standard deeplink as active on page load
        this.createStandardDeeplink();
    };

    // init section 

    this.init();

}


// ADD COPY NOTIFIACTION

function CopyLinkNotification(x) {

    var copyNotification = document.getElementById(x);

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


// ADD PARAMS

function AddParamInput(props) {
    this._props = props;
    this._param = props.param;
    this._parent = props.parent;
    this._label = props.label;
    this._checked = props.checked;
    this._checkBox = '<input type="checkbox" '+ this._checked  +' name="'+ this._param  +'" id="'+ this._param +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label;
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
