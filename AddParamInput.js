
// create input for param

function AddParamInput(props) {
    this._props = props;
    this._param = props.param;
    this._parent = props.parent;
    this._label = props.label;
    this._checked = props.checked;
    this._min = props.min || null;
    this._max = props.max || null;
    this._tooltip_info = props.tooltip_info || this._param;
    this._tooltip = '<div class="param-tooltip param-'+this._param+'" data-title="'+ this._tooltip_info +'"></div>';
    this._checkBox = '<input type="checkbox" '+ this._checked  +' name="'+ this._param  +'" id="'+ this._param +'-checkbox" value="' + this._param  +'" class="deeplinkParamCheckBox">' + this._label;
    this._inputFieldValue = '<input type="'+ props.type +'" id="'+ this._param +'-inputField" placeholder="'+ this._param +'" data-param="'+ this._param +'" class="deeplinkParamValue" '+ this._min +' '+ this._max +'>';

    // create Fieldset Element

    this.fieldSet = document.createElement('FIELDSET');
    this.fieldSet.classList.add('param-fieldset');
    this.fieldSet.innerHTML =  this._tooltip + this._checkBox + this._inputFieldValue;

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