
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

module.exports ={
    isNumber,
    validSizeEq,
    onlyLetters,
    validSizeMay
}
