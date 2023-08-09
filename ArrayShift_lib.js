var exports = module.exports = {};

exports.arrayShift = function(arg, n)
{
    for(var i = 0; i<n; i++)
        arg.shift();
};

exports.arrayUnshift = async function(array, arg)
{
    array.unshift(arg);
};
