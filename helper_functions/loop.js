function BuildSelectOptions(props) {

    var select = document.getElementById(props.field);

    let opt = document.createElement('option');
    opt.appendChild( document.createTextNode(props.label) );
    opt.value = props.value; 
    select.appendChild(opt);

}

// fetch data

async function populateSelect(url) {

    var res = await fetch(url);
    var data = await res.json();
    return data;
    
}


// env

let envLoop = populateSelect('./data/env.json');
    envLoop.then((res) => {
        res.forEach((i) => {
            return new BuildSelectOptions({
                  field: 'environment',
                  label: i.label,
                  value:  i.value
              });
          });
    });

// // locale

let localeLoop = populateSelect('./data/locale.json');
localeLoop.then((res) => {
        res.forEach((i) => {
            return new BuildSelectOptions({
                  field: 'locale',
                  label: i.label,
                  value:  i.value
              });
          });
    });

// // brand

let brandLoop = populateSelect('./data/brand.json');
brandLoop.then((res) => {
        res.forEach((i) => {
            return new BuildSelectOptions({
                  field: 'brand',
                  label: i.label,
                  value:  i.value
              });
          });
    });

// // search/reserve

let searchBookLoop = populateSelect('./data/searchBook.json');
searchBookLoop.then((res) => {
        res.forEach((i) => {
            return new BuildSelectOptions({
                  field: 'searchBook',
                  label: i.label,
                  value:  i.value
              });
          });
    });
