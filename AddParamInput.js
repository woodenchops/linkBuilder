
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

export default AddParamInput;