module.exports = fn => {
  console.log("function", fn);
  
  return (req, res, next) => {
    console.log("before request");    
    fn(req, res, next).catch(next);
    console.log("after request");    
  };
};
