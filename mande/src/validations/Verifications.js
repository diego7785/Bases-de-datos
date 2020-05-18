
var isNumber = value =>
{
    return /^\d+$/.test(value);
}

var validSizeEq = (value,num) =>
{
    if(value.length === num)
    {
        return true;
    }
    else
    {
        return false; 
    }
}

var onlyLetters = value =>
{
    return  /^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ ]+$/.test(value);
}

var validSizeMay = (value,num) =>
{
    if(value.length >= num)
    {
        return true;
    }
    else
    {
        return false; 
    }

}

var emptyField = value =>
{
    if (value.length === 0 || value ===true)
    {
        return true;
    }
    else
    {
        return false;
    }
}

var diferentType = (value,vari) =>
{
    if (typeof(value) !== vari)
    {
        return true;
    }
    else{
        return false;
    }
}

module.exports ={
    isNumber,
    validSizeEq,
    onlyLetters,
    validSizeMay,
    emptyField,
    diferentType
}
